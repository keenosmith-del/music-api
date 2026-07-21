import axios from "axios";

import Parser from "rss-parser";

const parser = new Parser();

export async function searchPodcasts(query) {
    const response = await axios.get(
        "https://itunes.apple.com/search",
        {
            params: {
                term: query,
                media: "podcast",
                limit: 20,
            },
        }
    );

    return response.data.results.map((podcast) => ({
        id: podcast.collectionId,

        title: podcast.collectionName,

        artist: podcast.artistName,

        artwork: podcast.artworkUrl600 || podcast.artworkUrl100,

        description: podcast.primaryGenreName,

        feedUrl: podcast.feedUrl,

        podcastUrl: podcast.collectionViewUrl,

        explicit:
            podcast.collectionExplicitness === "explicit",
    }));
}

export async function getPodcastEpisodes(feedUrl) {
    const feed = await parser.parseURL(feedUrl);

    const episodes = feed.items
        .filter((item) => item.enclosure?.url)
        .map((item) => ({
            id: item.guid || item.link,

            title: item.title,

            artist: feed.title,

            album: feed.title,

            artwork:
                item.itunes?.image ||
                feed.itunes?.image ||
                feed.image?.url,

            preview: item.enclosure.url,

            duration: 0,

            explicit: false,
        }));

    return {
        title: feed.title,
        artwork: feed.itunes?.image || feed.image?.url,
        tracks: episodes,
    };
}

export async function getPodcastDetails(id) {
    const response = await axios.get(
        "https://itunes.apple.com/lookup",
        {
            params: {
                id,
                entity: "podcast",
            },
        }
    );

    const podcast = response.data.results[0];

    if (!podcast) {
        throw new Error("Podcast not found.");
    }

    const episodes = await getPodcastEpisodes(
        podcast.feedUrl
    );

    return {
        id: podcast.collectionId,

        title: podcast.collectionName,

        artist: podcast.artistName,

        artwork:
            podcast.artworkUrl600 ||
            podcast.artworkUrl100,

        description: podcast.primaryGenreName,

        feedUrl: podcast.feedUrl,

        podcastUrl: podcast.collectionViewUrl,

        explicit:
            podcast.collectionExplicitness === "explicit",

        tracks: episodes.tracks,
    };
}