import {
    searchTracks,
    searchAlbums,
    searchAlbumBrowse,
    searchAlbumBrowseArtistArt,
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
                "Tyler, The Creator",
                "Daniel Caesar",
                "Billie Eilish",
                "21 Savage",
                "Kali Uchis",
            ]),
        },

        {
            id: "featured-playlists",
            title: "Featured Albums",
            type: "album",
            items: await searchAlbumBrowse([
                "Kanye West",
                "Kaytranada",
                "James Blake",
            ]),
        },

        {
            id: "editor-picks",
            title: "Editor's Picks",
            type: "album",
            items: await searchAlbumBrowse([
                "LE$",
                "SiR",
                "Arlo Parks",
                "Nao",
                "Chiiild",
                "Kwaku Asante",

            ]),
        },

        {
            id: "essentials",
            title: "Essentials",
            type: "album",
            items: await searchAlbumBrowse([
                "Rina Sawayama",
                "Cleo Sol",
                "Sevdaliza",
                "Sabrina Claudio",
                "Amber Mark",
                "Zsela",
            ]),
        },

        {
            id: "charts",
            title: "Charts",
            type: "album",
            items: await searchAlbumBrowse([
                "Jordan Ward",
                "Joy Crookes",
                "Mereba",
                "Jordan Rakei",
                "Alex Isley",
                "Gallant",
            ]),
        },

        {
            id: "promoted-releases",
            title: "New & Popular",
            type: "album",
            items: await searchAlbumBrowse([
                "Khamari",
                "SZA",
                "Beabadoobee",
                "The Marías",
                "Ruel",
                "The Beatles",
                "Bad Bunny",
            ]),
        },

        {
            id: "hip-hop",
            title: "Hip Hop",
            type: "album",
            items: await searchAlbumBrowse([
                "FKA twigs",
                "PinkPantheress",
                "Remi Wolf",
                "Dijon",
                "Yeek",
            ]),
        },

        {
            id: "rnb",
            title: "R&B",
            type: "album",
            items: await searchAlbumBrowse([
                "Frank Ocean",
                "UMI",
                "Destin Conrad",
                "Redveil",
                "Kota the Friend",
            ]),
        },

        {
            id: "chill",
            title: "Chill",
            type: "album",
            items: await searchAlbumBrowse([
                "RIMON",
                "Cigarettes After Sex",
                "Bon Iver",
                "Novo Amor",
                "Phoebe Bridgers",
                "Hollow Coves",
            ]),
        },

        {
            id: "pop",
            title: "ChPopill",
            type: "album",
            items: await searchAlbumBrowse([
                "Berhana",
                "Kiefer",
                "Pink Siifu",
                "Demae",
                "Deb Never",
            ]),
        },
    ];
}

export async function buildNew() {
    return {
        newAlbums: await searchAlbumBrowse([
            "Teddy Swims",
            "Cleo Sol",
            "Lucky Daye",
        ]),

        newSongs: await searchTrackBrowse([
            "FKJ",
            "Tom Misch",
            "Drake",
            "Daniel Caesar",
            "Frank Ocean",
            "Summer Walker",
            "Kehlani",
            "Jhené Aiko",
            "Kevin George",
            "Merges",
            "Yeek",
            "Jean Dawson",
        ]),

        newThisWeek: await searchAlbumBrowseArtistArt([
            "Lucky Daye",
            "Future",
            "Young Thug",
            "Oscar Jerome",
            "Ty Dolla $ign",
            "21 Savage",
            //"Terrace Martin",
            "Mndsgn",
            "Kiefer",
        ]),

        recentReleases: await searchAlbumBrowseArtistArt([
            "John Lennon",
            "Benson Boone",
            "Chiiild",
            "Snoh Aalegra",
            "Cleo Sol",
            "Kwaku Asante",
            "Deb Never",
            "Empress Of",
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
            // "Jimmy Napes",
            "Don Diablo",
            "Sooks",
            "Kid Fonque",
            // "Nightcrawlers",
            "Octave One",
            "Ferreck Dawn",
            // "London Topaz",
            // "Julien Fade",
            // "Samuel Miller",
            // "Sam Welch",
            // "T.Matthias",
            // "James Carter",
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

