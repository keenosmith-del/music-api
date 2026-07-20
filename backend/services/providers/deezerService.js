import axios from "axios";

export async function searchTracks(query) {
    const response = await axios.get(
        `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
    );

    return response.data.data.map(track => ({
        id: track.id,
        title: track.title,
        artist: track.artist.name,
        album: track.album.title,
        artwork: track.album.cover_big,
        duration: track.duration,
        preview: track.preview,

        explicit:
            track.explicit_lyrics ??
            track.explicit ??
            false,
    }));
}

export async function searchMusic(query) {
    const term = query.trim().toLowerCase();

    const [
        tracksResponse,
        albumsResponse,
        artistsResponse,
    ] = await Promise.all([
        axios.get(
            `https://api.deezer.com/search?q=${encodeURIComponent(query)}`
        ),

        axios.get(
            `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}`
        ),

        axios.get(
            `https://api.deezer.com/search/artist?q=${encodeURIComponent(query)}`
        ),
    ]);

    const songs = tracksResponse.data.data
        .filter((track) =>
            track.title.toLowerCase().includes(term) ||
            track.artist.name.toLowerCase().includes(term)
        )
        .map((track) => ({
            id: track.id,

            albumId: track.album.id,

            title: track.title,

            artist: track.artist.name,

            album: track.album.title,

            artwork: track.album.cover_big,

            duration: track.duration,

            preview: track.preview,

            explicit:
                track.explicit_lyrics ??
                track.explicit ??
                false,
        }));

    const albums = albumsResponse.data.data
        .filter((album) =>
            album.title.toLowerCase().includes(term) ||
            album.artist.name.toLowerCase().includes(term)
        )
        .map((album) => ({
            id: album.id,

            title: album.title,

            artist: album.artist.name,

            artwork: album.cover_big,
        }));

    const artists = artistsResponse.data.data
        .filter((artist) =>
            artist.name.toLowerCase().includes(term)
        )
        .map((artist) => ({
            id: artist.id,

            name: artist.name,

            artwork: artist.picture_big,
        }));

    return {
        songs,
        albums,
        artists,
    };
}

export async function searchAlbums(query) {
    const response = await axios.get(
        `https://api.deezer.com/search/album?q=${encodeURIComponent(query)}`
    );

    return response.data.data.map((album) => ({
        id: album.id,

        title: album.title,

        artist: album.artist.name,

        artwork: album.cover_big,
    }));
}

export async function searchAlbumBrowseArtistArt(artists) {
    const artistList = Array.isArray(artists)
        ? artists
        : [artists];

    const responses = [];

    for (const artist of artistList) {
        const trackResponse = await axios.get(
            `https://api.deezer.com/search?q=${encodeURIComponent(artist)}`
        );

        const artistResponse = await axios.get(
            `https://api.deezer.com/search/artist?q=${encodeURIComponent(artist)}`
        );

        responses.push({
            trackResponse,
            artistResponse,
        });
    }

    const albums = [];
    const seen = new Set();

    responses.forEach(({ trackResponse, artistResponse }, index) => {
        let count = 0;

        const artistName = artistList[index].toLowerCase();

        const artist = artistResponse.data.data.find(
            (item) =>
                item.name.toLowerCase().includes(artistName)
        );

        trackResponse.data.data.forEach((track) => {
            if (count >= 1) return;

            // Only keep albums from the artist we searched for
            if (!track.artist.name.toLowerCase().includes(artistName)) {
                return;
            }

            if (seen.has(track.album.id)) {
                return;
            }

            seen.add(track.album.id);

            albums.push({
                id: track.album.id,
                title: track.album.title,
                artist: track.artist.name,
                artwork: artist?.picture_big || track.album.cover_big,
                preview: track.preview,
                duration: track.duration,
                explicit:
                    track.explicit_lyrics ??
                    track.explicit ??
                    false,
            });

            count++;
        });
    });

    return albums;
}

export async function searchAlbumBrowse(artists) {
    const artistList = Array.isArray(artists)
        ? artists
        : [artists];

    const responses = [];

    for (const artist of artistList) {
        const response = await axios.get(
            `https://api.deezer.com/search?q=${encodeURIComponent(artist)}`
        );

        responses.push(response);
    }

    const albums = [];
    const seen = new Set();

    responses.forEach((response) => {
        let count = 0;

        const artistName = artistList[responses.indexOf(response)].toLowerCase();

        response.data.data.forEach((track) => {
            if (count >= 3) return;

            // Only keep albums from the artist we searched for
            if (!track.artist.name.toLowerCase().includes(artistName)) {
                return;
            }

            if (seen.has(track.album.id)) {
                return;
            }

            seen.add(track.album.id);

            albums.push({
                id: track.album.id,
                title: track.album.title,
                artist: track.artist.name,
                artwork: track.album.cover_big,
                preview: track.preview,
                duration: track.duration,
                explicit:
                    track.explicit_lyrics ??
                    track.explicit ??
                    false,
            });

            count++;
        });
    });

    return albums;
}

export async function searchTrackBrowse(artists) {
    const artistList = Array.isArray(artists)
        ? artists
        : [artists];

    const responses = await Promise.all(
        artistList.map(async (artist) => {
            const [trackResponse, artistResponse] = await Promise.all([
                axios.get(
                    `https://api.deezer.com/search?q=${encodeURIComponent(artist)}`
                ),
                axios.get(
                    `https://api.deezer.com/search/artist?q=${encodeURIComponent(artist)}`
                ),
            ]);

            return {
                trackResponse,
                artistResponse,
            };
        })
    );

    const songs = [];
    const seen = new Set();

    responses.forEach(({ trackResponse, artistResponse }, index) => {
        const artistName = artistList[index].toLowerCase();

        const track = trackResponse.data.data.find(
            (track) =>
                track.artist.name.toLowerCase().includes(artistName)
        );

        const artist = artistResponse.data.data.find(
            (item) =>
                item.name.toLowerCase().includes(artistName)
        );

        if (!track) return;

        songs.push({
            id: track.id,

            albumId: track.album.id,

            title: track.title,

            artist: track.artist.name,

            album: track.album.title,

            artwork: artist?.picture_big || track.album.cover_big,

            duration: track.duration,

            preview: track.preview,

            explicit:
                track.explicit_lyrics ??
                track.explicit ??
                false,
        });
    });

    return songs;
}

export async function getAlbumTracks(albumId) {
    const response = await axios.get(
        `https://api.deezer.com/album/${albumId}`
    );

    return {
        id: response.data.id,

        title: response.data.title,

        artist: response.data.artist.name,

        artwork: response.data.cover_big,

        tracks: response.data.tracks.data.map((track) => ({
            id: track.id,

            title: track.title,

            artist: response.data.artist.name,

            album: response.data.title,

            artwork: response.data.cover_big,

            duration: track.duration,

            preview: track.preview,

            explicit:
                track.explicit_lyrics ??
                track.explicit ??
                false,
        })),
    };
}


export async function searchArtistBrowse(artists) {
    const artistList = Array.isArray(artists)
        ? artists
        : [artists];

    const responses = await Promise.all(
        artistList.map((artist) =>
            axios.get(
                `https://api.deezer.com/search/artist?q=${encodeURIComponent(artist)}`
            )
        )
    );

    return responses
        .map((response, index) => {
            const artistName = artistList[index].toLowerCase();

            const artist = response.data.data.find((item) =>
                item.name.toLowerCase().includes(artistName)
            );

            if (!artist) return null;

            return {
                id: artist.id,
                name: artist.name,
                artwork: artist.picture_big,
            };
        })
        .filter(Boolean);
}

export async function searchTracksByArtist(artistName) {
    const response = await axios.get(
        `https://api.deezer.com/search?q=${encodeURIComponent(artistName)}`
    );

    return response.data.data
        .filter((track) =>
            track.artist.name
                .toLowerCase()
                .includes(artistName.toLowerCase())
        )
        .map((track) => ({
            id: track.id,

            title: track.title,

            artist: track.artist.name,

            album: track.album.title,

            artwork: track.album.cover_big,

            duration: track.duration,

            preview: track.preview,

            explicit:
                track.explicit_lyrics ??
                track.explicit ??
                false,
        }));
}

export async function getCategoryTracks(category) {
    const categories = {
        rock: [
            "Linkin Park",
            "Foo Fighters",
            "Green Day",
            "Muse",
            "Metallica",
            "Nirvana",
        ],

        hits: [
            "Taylor Swift",
            "The Weeknd",
            "Sabrina Carpenter",
            "Billie Eilish",
            "Ed Sheeran",
            "Dua Lipa",
        ],

        concert: [
            "Queen",
            "Coldplay",
            "U2",
            "Bruce Springsteen",
            "Foo Fighters",
            "Pearl Jam",
        ],

        chill: [
            "FKJ",
            "Cigarettes After Sex",
            "Bon Iver",
            "Novo Amor",
            "Khruangbin",
            "Men I Trust",
        ],

        charts: [
            "Taylor Swift",
            "Drake",
            "SZA",
            "The Weeknd",
            "Morgan Wallen",
            "Tate McRae",
        ],

        hiphop: [
            "Kendrick Lamar",
            "Drake",
            "J. Cole",
            "Future",
            "Travis Scott",
            "Tyler, The Creator",
        ],

        live: [
            "Queen",
            "Coldplay",
            "U2",
            "Pearl Jam",
            "Foo Fighters",
            "Bruce Springsteen",
        ],

        rnb: [
            "SZA",
            "Frank Ocean",
            "Brent Faiyaz",
            "Summer Walker",
            "Kehlani",
            "H.E.R.",
        ],

        gospel: [
            "Kirk Franklin",
            "Maverick City Music",
            "CeCe Winans",
            "Tasha Cobbs Leonard",
            "Elevation Worship",
            "Israel Houghton",
        ],

        dance: [
            "Calvin Harris",
            "David Guetta",
            "Martin Garrix",
            "Kygo",
            "Alok",
            "Tiësto",
        ],

        alternative: [
            "Arctic Monkeys",
            "The Killers",
            "The Strokes",
            "Radiohead",
            "Muse",
            "Kings of Leon",
        ],

        "2010s": [
            "Imagine Dragons",
            "OneRepublic",
            "Adele",
            "Bruno Mars",
            "Ed Sheeran",
            "The Weeknd",
        ],

        "80s": [
            "Michael Jackson",
            "Madonna",
            "Prince",
            "Bon Jovi",
            "Journey",
            "Whitney Houston",
        ],

        "70s": [
            "Fleetwood Mac",
            "Queen",
            "ABBA",
            "Bee Gees",
            "Elton John",
            "David Bowie",
        ],

        jazz: [
            "Miles Davis",
            "John Coltrane",
            "Ella Fitzgerald",
            "Louis Armstrong",
            "Nina Simone",
            "Duke Ellington",
        ],

        country: [
            "Luke Combs",
            "Chris Stapleton",
            "Morgan Wallen",
            "Kacey Musgraves",
            "Zach Bryan",
            "Lainey Wilson",
        ],

        essentials: [
            "The Beatles",
            "Queen",
            "Fleetwood Mac",
            "Michael Jackson",
            "Prince",
            "Elton John",
        ],

        focus: [
            "FKJ",
            "Tycho",
            "Ólafur Arnalds",
            "Nils Frahm",
            "Bonobo",
            "Boards of Canada",
        ],

        feelgood: [
            "Bruno Mars",
            "Pharrell Williams",
            "Justin Timberlake",
            "Earth, Wind & Fire",
            "Dua Lipa",
            "Katy Perry",
        ],

        love: [
            "Adele",
            "John Legend",
            "Ed Sheeran",
            "Daniel Caesar",
            "Lana Del Rey",
            "Sam Smith",
        ],

        party: [
            "Pitbull",
            "Flo Rida",
            "David Guetta",
            "LMFAO",
            "Black Eyed Peas",
            "Usher",
        ],

        soulfunk: [
            "Stevie Wonder",
            "Marvin Gaye",
            "Earth, Wind & Fire",
            "James Brown",
            "Prince",
            "Aretha Franklin",
        ],

        oldies: [
            "Elvis Presley",
            "The Beatles",
            "The Beach Boys",
            "Frank Sinatra",
            "Roy Orbison",
            "The Supremes",
        ],

        reggae: [
            "Bob Marley",
            "Jimmy Cliff",
            "Sean Paul",
            "Damian Marley",
            "Toots and the Maytals",
            "Shaggy",
        ],

        metal: [
            "Metallica",
            "Iron Maiden",
            "Slipknot",
            "System Of A Down",
            "Avenged Sevenfold",
            "Disturbed",
        ],
    };

    return searchTrackBrowse(categories[category] || []);
}
