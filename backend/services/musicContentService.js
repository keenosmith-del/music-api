import {
    searchTracks,
    searchAlbums,
    searchAlbumBrowse,
    searchTrackBrowse,
    searchArtistBrowse,
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
                "The Weeknd",
                "ROSALÍA",
                "Billie Eilish",
                "Billy Joel",
                "Sabrina Carpenter",
            ]),
        },

        {
            id: "featured-playlists",
            title: "Featured Albums",
            type: "album",
            items: await searchAlbumBrowse([
                "H.E.R",
                "Adele",
                "Drake",
                "Madonna",
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
                "SZA",
                "The Beatles",
                "Doja Cat",
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
                "John Coltrane",
                "Miles Davis",
                "Nina Simone",
                "Ella Fitzgerald",
                "Louis Armstrong",
                "Duke Ellington",
            ]),
        },

        {
            id: "chill",
            title: "Chill",
            type: "album",
            items: await searchAlbumBrowse([
                "Cigarettes After Sex",
                "Bon Iver",
                "Novo Amor",
                "Phoebe Bridgers",
                "Hollow Coves",
            ]),
        },
    ];
}

export async function buildNew() {
    return {
        newAlbums: await searchAlbumBrowse([
            "Teddy Swims",
            "Brent Faiyaz",
            "Gucci Mane",
            "Lil Baby",
            "Roddy Ricch",
        ]),

        newSongs: await searchTrackBrowse([
            "FKJ",
            "Drake",
            "Khalid",
            "6LACK",
            "Summer Walker",
            "Kehlani",
            "Jhené Aiko",
        ]),

        newThisWeek: await searchAlbumBrowse([
            "Future",
            "Young Thug",
            "Ty Dolla $ign",
            "21 Savage",
        ]),

        recentReleases: await searchAlbumBrowse([
            "Benson Boone",
            "Tate McRae",
            "Offset",
            "Quavo",
        ]),
    };
}

export async function buildRadio() {
    return {
        artistTakeover: await searchArtistBrowse([
            "Davido",
            "Jaymin",
            "Tyler, The Creator",
            "Bad Bunny",
            "Burna Boy",
            "Omah Lay",
            "sombr",
        ]),

        liveSessions: await searchArtistBrowse([
            "LA ROSALÍA",
            "Allyn",
            "Pearl Jam",
            "Soundgarden",
            "Alice in Chains",
            "Temple of the Dog",
        ]),

        djMixes: await searchArtistBrowse([
            "Steve Angello",
            "Cat Dealers",
            "Armin van Buuren",
            "Layton Giordani",
            "Steve Aoki",
            "Dombresky",
            "Avicii",
            "Mees Salomé",
            "Lost Frequencies",
            "Martin Garrix",
            "Oliver Heldens",
            "Sammy Virji",
            "Dimitri Vegas",
            "Kaskade",
        ]),

        rockRadio: await searchArtistBrowse([
            "Green Day",
            "Red Hot Chili Peppers",
            "Incubus",
            "Rage Against the Machine",
            "Jane's Addiction",
        ]),

        hipHopRadio: await searchArtistBrowse([
            "Travis Scott",
            "Lil Nas X",
            "YUNGBLUD",
            "Jhené Aiko",
            "Grandson",
        ]),

        houseRadio: await searchArtistBrowse([
            "Dwson",
            "Sio",
            "Michael G",
            "Sooks",
            "Kid Fonque",
        ]),
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