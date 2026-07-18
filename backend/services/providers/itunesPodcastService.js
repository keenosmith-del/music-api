import axios from "axios";

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