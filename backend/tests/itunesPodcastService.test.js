import assert from "node:assert/strict";
import { afterEach, beforeEach, mock, test } from "node:test";
import axios from "axios";
import Parser from "rss-parser";
import {
    getPodcastDetails,
    getPodcastEpisodes,
    searchPodcasts,
} from "../services/providers/itunesPodcastService.js";

beforeEach(() => {
    mock.method(axios, "get", async () => {
        throw new Error("Unexpected unconfigured provider request");
    });
    mock.method(Parser.prototype, "parseURL", async () => {
        throw new Error("Unexpected unconfigured RSS request");
    });
});

afterEach(() => mock.restoreAll());

const podcast = {
    collectionId: 42,
    collectionName: "Example Podcast",
    artistName: "Example Author",
    artworkUrl600: "https://example.test/large.jpg",
    artworkUrl100: "https://example.test/small.jpg",
    primaryGenreName: "Technology",
    feedUrl: "https://example.test/feed.xml",
    collectionViewUrl: "https://example.test/show",
    collectionExplicitness: "explicit",
};

test("search sends provider parameters and maps podcast metadata", async () => {
    axios.get.mock.mockImplementation(async () => ({ data: { results: [podcast] } }));
    const results = await searchPodcasts("science & technology");
    assert.deepEqual(axios.get.mock.calls[0].arguments, [
        "https://itunes.apple.com/search",
        { params: { term: "science & technology", media: "podcast", limit: 20 } },
    ]);
    assert.deepEqual(results, [{
        id: 42, title: "Example Podcast", artist: "Example Author",
        artwork: "https://example.test/large.jpg", description: "Technology",
        feedUrl: podcast.feedUrl, podcastUrl: podcast.collectionViewUrl,
        explicit: true,
    }]);
});

test("search falls back to smaller art and preserves non-explicit status", async () => {
    axios.get.mock.mockImplementation(async () => ({ data: { results: [{
        ...podcast, artworkUrl600: undefined, collectionExplicitness: "notExplicit",
    }] } }));
    const [result] = await searchPodcasts("example");
    assert.equal(result.artwork, podcast.artworkUrl100);
    assert.equal(result.explicit, false);
});

test("search with no provider matches returns an empty list", async () => {
    axios.get.mock.mockImplementation(async () => ({ data: { results: [] } }));
    assert.deepEqual(await searchPodcasts("no matches"), []);
});

test("provider search errors propagate to the API caller", async () => {
    const failure = new Error("Provider unavailable");
    axios.get.mock.mockImplementation(async () => { throw failure; });
    await assert.rejects(searchPodcasts("example"), (error) => error === failure);
});

test("episode mapping excludes non-playable items and keeps queue metadata", async () => {
    Parser.prototype.parseURL.mock.mockImplementation(async () => ({
        title: "Feed title", itunes: { image: "https://example.test/feed.jpg" },
        items: [
            { guid: "episode-1", title: "First", enclosure: { url: "https://example.test/1.mp3" }, itunes: { image: "https://example.test/episode.jpg" } },
            { link: "https://example.test/second", title: "Second", enclosure: { url: "https://example.test/2.mp3" } },
            { title: "Article without audio" },
            { title: "Empty enclosure", enclosure: {} },
        ],
    }));
    const result = await getPodcastEpisodes(podcast.feedUrl);
    assert.deepEqual(Parser.prototype.parseURL.mock.calls[0].arguments, [podcast.feedUrl]);
    assert.equal(result.title, "Feed title");
    assert.equal(result.artwork, "https://example.test/feed.jpg");
    assert.equal(result.tracks.length, 2);
    assert.equal(result.tracks[0].id, "episode-1");
    assert.equal(result.tracks[0].artwork, "https://example.test/episode.jpg");
    assert.equal(result.tracks[0].preview, "https://example.test/1.mp3");
    assert.equal(result.tracks[0].artist, "Feed title");
    assert.equal(result.tracks[0].album, "Feed title");
    assert.equal(result.tracks[1].id, "https://example.test/second");
    assert.equal(result.tracks[1].artwork, result.artwork);
});

test("RSS image is used when iTunes artwork is absent", async () => {
    Parser.prototype.parseURL.mock.mockImplementation(async () => ({
        title: "Feed", image: { url: "https://example.test/rss.jpg" },
        items: [{ guid: "one", enclosure: { url: "https://example.test/one.mp3" } }],
    }));
    const result = await getPodcastEpisodes(podcast.feedUrl);
    assert.equal(result.artwork, "https://example.test/rss.jpg");
    assert.equal(result.tracks[0].artwork, result.artwork);
});

test("an empty feed yields an empty playback queue", async () => {
    Parser.prototype.parseURL.mock.mockImplementation(async () => ({ title: "Empty", items: [] }));
    const result = await getPodcastEpisodes(podcast.feedUrl);
    assert.deepEqual(result.tracks, []);
    assert.equal(result.title, "Empty");
});

test("RSS failures propagate without inventing an empty successful response", async () => {
    const failure = new Error("Malformed RSS");
    Parser.prototype.parseURL.mock.mockImplementation(async () => { throw failure; });
    await assert.rejects(getPodcastEpisodes(podcast.feedUrl), (error) => error === failure);
});

test("podcast details combine lookup metadata with playable episodes", async () => {
    axios.get.mock.mockImplementation(async () => ({ data: { results: [podcast] } }));
    Parser.prototype.parseURL.mock.mockImplementation(async () => ({
        title: "Feed title", items: [{ guid: "one", enclosure: { url: "https://example.test/one.mp3" } }],
    }));
    const result = await getPodcastDetails(42);
    assert.deepEqual(axios.get.mock.calls[0].arguments, [
        "https://itunes.apple.com/lookup", { params: { id: 42, entity: "podcast" } },
    ]);
    assert.equal(result.id, 42);
    assert.equal(result.title, "Example Podcast");
    assert.equal(result.explicit, true);
    assert.equal(result.tracks[0].id, "one");
    assert.equal(Parser.prototype.parseURL.mock.calls[0].arguments[0], podcast.feedUrl);
});

test("a missing lookup result rejects before fetching RSS", async () => {
    axios.get.mock.mockImplementation(async () => ({ data: { results: [] } }));
    await assert.rejects(getPodcastDetails(99), { message: "Podcast not found." });
    assert.equal(Parser.prototype.parseURL.mock.callCount(), 0);
});

test("lookup and details RSS errors propagate unchanged", async () => {
    const lookupFailure = new Error("Lookup failed");
    axios.get.mock.mockImplementation(async () => { throw lookupFailure; });
    await assert.rejects(getPodcastDetails(42), (error) => error === lookupFailure);
    assert.equal(Parser.prototype.parseURL.mock.callCount(), 0);

    const rssFailure = new Error("Feed failed");
    axios.get.mock.mockImplementation(async () => ({ data: { results: [podcast] } }));
    Parser.prototype.parseURL.mock.mockImplementation(async () => { throw rssFailure; });
    await assert.rejects(getPodcastDetails(42), (error) => error === rssFailure);
});

test("episode explicit labels preserve affirmative RSS values, not false strings", async () => {
    const values = ["true", true, "YES", " explicit ", "false", false, "no", "clean", undefined];
    Parser.prototype.parseURL.mock.mockImplementation(async () => ({
        title: "Feed", items: values.map((value, index) => ({
            guid: String(index), enclosure: { url: `https://example.test/${index}.mp3` },
            itunes: { explicit: value },
        })),
    }));
    const result = await getPodcastEpisodes(podcast.feedUrl);
    assert.deepEqual(result.tracks.map((track) => track.explicit), [
        true, true, true, true, false, false, false, false, false,
    ]);
});

test("real RSS parsing carries episode explicit tags into playback tracks", async () => {
    const xml = `<?xml version="1.0"?>
        <rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
          <channel><title>Example Feed</title><link>https://example.test</link>
            <description>Offline fixture</description><itunes:explicit>true</itunes:explicit>
            <item><title>Explicit episode</title><guid>explicit-one</guid>
              <itunes:explicit>true</itunes:explicit>
              <enclosure url="https://example.test/explicit.mp3" type="audio/mpeg" length="100" />
            </item>
            <item><title>Clean episode</title><guid>clean-one</guid>
              <itunes:explicit>false</itunes:explicit>
              <enclosure url="https://example.test/clean.mp3" type="audio/mpeg" length="100" />
            </item>
            <item><title>Inherited flag</title><guid>inherits</guid>
              <enclosure url="https://example.test/inherited.mp3" type="audio/mpeg" length="100" />
            </item>
          </channel>
        </rss>`;
    Parser.prototype.parseURL.mock.mockImplementation(async () => new Parser().parseString(xml));
    const result = await getPodcastEpisodes(podcast.feedUrl);
    assert.equal(result.title, "Example Feed");
    assert.deepEqual(result.tracks.map(({ id, explicit }) => ({ id, explicit })), [
        { id: "explicit-one", explicit: true },
        { id: "clean-one", explicit: false },
        { id: "inherits", explicit: true },
    ]);
});

test("missing episode flags inherit show metadata while clean overrides are preserved", async () => {
    Parser.prototype.parseURL.mock.mockImplementation(async () => ({
        title: "Feed", itunes: { explicit: "true" }, items: [
            { guid: "inherits", enclosure: { url: "https://example.test/1.mp3" } },
            { guid: "clean", itunes: { explicit: "false" }, enclosure: { url: "https://example.test/2.mp3" } },
            { guid: "clean-boolean", itunes: { explicit: false }, enclosure: { url: "https://example.test/3.mp3" } },
        ],
    }));
    const result = await getPodcastEpisodes(podcast.feedUrl);
    assert.deepEqual(result.tracks.map((track) => track.explicit), [true, false, false]);
});
