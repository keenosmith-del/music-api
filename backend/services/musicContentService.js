import {
    searchTracks,
    searchAlbums,
    searchAlbumBrowse,
    searchMusic,
} from "./providers/deezerService.js";

import { searchPodcasts } from "./providers/itunesPodcastService.js";

export async function buildHome() {
    return [
        {
            id: "trending-albums",
            title: "Trending Albums",
            type: "album",
            items: await searchAlbumBrowse([
                "Taylor Swift",
                "The Weeknd",
                "Billie Eilish",
                "Olivia Rodrigo",
                "Sabrina Carpenter",
            ]),
        },

        {
            id: "featured-playlists",
            title: "Featured Albums",
            type: "album",
            items: await searchAlbumBrowse([
                "Coldplay",
                "Ed Sheeran",
                "Adele",
                "Bruno Mars",
                "Imagine Dragons",
            ]),
        },

        {
            id: "editor-picks",
            title: "Editor's Picks",
            type: "album",
            items: await searchAlbumBrowse([
                "Pink Floyd",
                "Fleetwood Mac",
                "Queen",
                "Radiohead",
                "David Bowie",
            ]),
        },

        {
            id: "promoted-releases",
            title: "New & Popular",
            type: "album",
            items: await searchAlbumBrowse([
                "Dua Lipa",
                "Doja Cat",
                "Post Malone",
                "SZA",
                "Benson Boone",
            ]),
        },

        {
            id: "hip-hop",
            title: "Hip Hop",
            type: "album",
            items: await searchAlbumBrowse([
                "Kendrick Lamar",
                "Eminem",
                "Drake",
                "J. Cole",
                "Nas",
                "Travis Scott",
            ]),
        },

        {
            id: "rnb",
            title: "R&B",
            type: "album",
            items: await searchAlbumBrowse([
                "SZA",
                "Frank Ocean",
                "Alicia Keys",
                "Usher",
                "H.E.R.",
            ]),
        },

        {
            id: "jazz",
            title: "Jazz",
            type: "album",
            items: await searchAlbumBrowse([
                "Louis Armstrong",
                "Miles Davis",
                "John Coltrane",
                "Ella Fitzgerald",
                "Duke Ellington",
            ]),
        },

        {
            id: "chill",
            title: "Chill",
            type: "album",
            items: await searchAlbumBrowse([
                "Bon Iver",
                "Novo Amor",
                "Cigarettes After Sex",
                "Phoebe Bridgers",
                "Hollow Coves",
            ]),
        },
    ];
}

export async function buildNew() {
    return {
        newAlbums: await searchTracks("new albums"),
        newSongs: await searchTracks("new songs"),
        newThisWeek: await searchTracks("this week"),
        recentReleases: await searchTracks("recent releases"),
    };
}

export async function buildRadio() {
    return {
        trendingStations: await searchTracks("top hits"),

        liveStations: await searchTracks("live"),

        djMixStations: await searchTracks("dj mix"),

        rockStations: await searchTracks("rock"),

        hipHopStations: await searchTracks("hip hop"),
    };
}

export async function buildPodcasts() {
    return {
        psychology: await searchPodcasts("psychology"),

        sleep: await searchPodcasts("sleep"),

        trueCrime: await searchPodcasts("true crime"),

        technology: await searchPodcasts("technology"),

        business: await searchPodcasts("business"),
    };
}

export async function buildSearch(query) {
    if (!query?.trim()) {
        return {
            artists: [],
            albums: [],
            songs: [],
        };
    }

    return await searchMusic(query);
}