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

        const artistName =
            artistList[responses.indexOf(response)].toLowerCase();

        console.log(artistName, response.data);

        if (!response.data?.data) {
            console.log("Bad response for:", artistName);
            return;
        }

        const tracks = response.data?.data ?? [];

        tracks.forEach((track) => {
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

export async function getRelatedArtists(artistName) {
    // Find the artist first
    const search = await axios.get(
        `https://api.deezer.com/search/artist?q=${encodeURIComponent(artistName)}`
    );

    const artist = search.data.data.find(
        (a) =>
            a.name.toLowerCase() === artistName.toLowerCase()
    );

    if (!artist) {
        return [];
    }

    // Get the artist's Top Tracks
    const topTracks = await axios.get(
        `https://api.deezer.com/artist/${artist.id}/top?limit=25`
    );

    const artistMap = new Map();

    topTracks.data.data.forEach((track) => {
        (track.contributors || []).forEach((contributor) => {
            const existing = artistMap.get(contributor.id);

            if (!existing) {
                artistMap.set(contributor.id, {
                    id: contributor.id,
                    name: contributor.name,
                });
            }
        });
    });

    // Look up each artist so we can rank by popularity
    const detailedArtists = [];

    for (const artist of artistMap.values()) {
        try {
            const response = await axios.get(
                `https://api.deezer.com/artist/${artist.id}`
            );

            detailedArtists.push({
                ...artist,
                fans: response.data.nb_fan || 0,
            });
        } catch {
            // ignore failures
        }
    }

    return detailedArtists
        .filter(
            (a) =>
                a.name.toLowerCase() !== artistName.toLowerCase()
        )
        .sort((a, b) => b.fans - a.fans)
        .map((artist) => artist.name);
}

export async function getAutoplaySongs(artistName) {
    const categories = {
        rock: [
            "beabadoobee",
            "Nirvana",
            "U2",
            "Cage the Elephant",
            "Mastodon",
            "In Color",
            "Matt Berninger",
            "Foo Fighters",
            "Queens of the Stone Age",
            "Dexter and The Moonrocks",
        ],

        hits: [
            "Ella Langley",
            "Harry Styles",
            "Stella Lefty",
            "Justin Bieber",
            "Noah Kahan",
            "Lady Gaga",
            "The Chainsmokers",
            "FISHER",
            "Doechii",
            "Latto",
        ],

        concert: [
            "Rod Wave",
            "Zach Brown",
            "Gracie Abrams",
            "Chris Brown",
            "Rihanna",
            "Oasis",
            "Jullian Gomes",
            "Arno Carstens",
            "Rammstein",
            "Gojira",
        ],

        chill: [
            "Cigarettes After Sex",
            "Bon Iver",
            "Novo Amor",
            "Khruangbin",
            "Men I Trust",
            "Rhye",
            "Vegyn",
            "Tycho",
            "Logic1000",
            "Sweatson Klank",
            "Poolside",
        ],

        charts: [
            "SZA",
            "Kenshi Yonezu",
            "Tame Impala",
            "Lil Baby",
            "Yung Miami",
            "Mac Miller",
            "Sam Fender",
            "HUGEL",
            "Imael Angel",
        ],

        hiphop: [
            "DaBaby",
            "Kendrick Lamar",
            "J. Cole",
            "Rick Ross",
            "Larry June",
            "Raq baby",
            "Jeezy",
            "PFG",
            "Post Malone",
            "Sleepy Hallow",
        ],

        live: [
            "Neil Young",
            "Sting",
            "Simply Red",
            "Billy Raffoul",
            "Failure",
            "Keith Urban",
            "JID",
            "Fly By Midnight",
            "Megan Maroney",
            "John Prine",
            "BigXthaPlug",
        ],

        rnb: [
            "Usher",
            "Bryson Tiller",
            "Ne-yo",
            "Frank Ocean",
            "Ari Lennox",
            "Omah Lay",
            "Ria Boss",
            "Syd",
            "Maxwell",
            "Toni Braxton",
        ],

        gospel: [
            "Anthny",
            "Israel Houghton",
            "CeCe Winans",
            "Jeremiah Paltan",
            "Kirk Franklin",
            "Maverick City Music",
            "Tasha Cobbs Leonard",
            "Elevation Worship",
            "Stevie Rizo",
            "Pastor Mike Jr.",
        ],

        dance: [
            "D.O.D",
            "Calvin Harris",
            "Kygo",
            "Gorgon City",
            "John Summit",
            "BLONDLISH",
            "Adriatique",
            "Kurtis Wells",
            "Elderbrook",
            "Alok",
            "Tiësto",
            "David Guetta",
        ],

        alternative: [
            "Beck",
            "This is Lorelei",
            "Dominic Fike",
            "Julia Wolf",
            "ROLE MODEL",
            "Phoebe Bridgers",
            "Kings Of Leon",
            "Tyler Ballgame",
            "Malcolm Todd",
            "Jawdropped",
        ],

        "2010s": [
            "Imagine Dragons",
            "OneRepublic",
            "LMFAO",
            "Hardwell",
            "Katy Perry",
            "Adele",
            "Bruno Mars",
            "Ed Sheeran",
            "Baauer",
            "Disclosure",
            "AFROJACK",
        ],

        "80s": [
            "Rick Astley",
            "John Mayer",
            "Seal",
            "The Beatles",
            "Toto",
            "Simple Minds",
            "Bryan Adams",
            "Genesis",
            "Bruce Hornsby",
            "Hot Chocolate",
        ],

        "70s": [
            "Fleetwood Mac",
            "ABBA",
            "Bee Gees",
            "Eagles",
            "Paul Simon",
            "Art Garfunkel",
            "Bread",
            "Earth, Wind & Fire",
            "Neil Diamond",
        ],

        jazz: [
            "Dean Martin",
            "Doris Day",
            "Wes Montgomery",
            "Nat King Cole",
            "Dexter Gordon",
            "Jutta Hipp",
            "Nina Simone",
            "Sarah Vaughan",
            "Miles Davis",
            "John Coltrane",
            "Ella Fitzgerald",
            "Louis Armstrong",
            "Duke Ellington",
        ],

        country: [
            "Jordan Davis",
            "Tucker Wetmore",
            "Roan Ash",
            "Keith Urban",
            "Blake Whiten",
            "Carter Faith",
            "Chris Tomlin",
            "Chris Stapleton",
            "Matthew West",
            "Shane McAnally",
            "Luke Bryan",
        ],

        essentials: [
            "Erykah Badu",
            "Anderson .Paak",
            "Mary J. Blige",
            "John Legend",
            "Solange",
            "Soul II Soul",
            "Raphael Saadiq",
            "Jamiroquai",
            "Jill Scott",
            "Common",
        ],

        focus: [
            "Calming Hearts",
            "Adam Bokesch",
            "Caio's Hub",
            "Sachiho",
            "Bazzi",
            "sunkis",
            "Matsuyama",
            "Naguro",
            "Kohei Yoshii",
            "Kozi Bella",
            "aunt",
            "Elijah Nang",
            "Melt On",
            "Kumai Goro",
        ],

        feelgood: [
            "Snoop Dogg",
            "Eminem",
            "Childish Gambino",
            "Fcukers",
            "Kid Cudi",
            "Pharrell Williams",
            "Justin Timberlake",
            "Lil Naay",
            "Anitta",
            "Noizy",
            "Saint Levant",
            "Demi Lovato",
        ],

        love: [
            "Akon",
            "Mike Posner",
            "Jason Derulo",
            "Ella Mai",
            "Sam Smith",
            "Majid Jordan",
            "Lewis Capaldi",
            "Lionel Richie",
            "Boyz II Men",
            "Brian McKnight",
            "Wale",
        ],

        party: [
            "Fatboy Slim",
            "Korolova",
            "Max Styler",
            "Dimitri Vegas",
            "Sebastian Ingrosso",
            "Tim Berg",
            "Swedish House Mafia",
            "Paul Kalkbrenner",
            "Daft Punk",
            "Otto Knows",
            "Nicky Romero",
        ],

        soulfunk: [
            "Stevie Wonder",
            "Marvin Gaye",
            "Earth, Wind & Fire",
            "James Brown",
            "Prince",
            "Aretha Franklin",
            "Amy Winehouse",
            "Rag'n'Bone Man",
        ],

        oldies: [
            "Yoko Ono",
            "Mick Fleetwood",
            "Elvis Presley",
            "Buddy Holly",
            "Ben E. King",
            "Sam Cooke",
            "Tony Bennett",
            "Jimmie Rodgers",
            "Guy Mitchell",
            "Perry Como",
            "Jo Stafford",
            "Danny Kaye",
            "Judy Garland",
        ],

        reggae: [
            "Vybz Kartel",
            "Jahmiel",
            "Zimi",
            "Bob Marley",
            "Protoje",
            "Teejay",
            "Konshens",
            "Jimmy Cliff",
            "Rvssian",
            "Tarrus Riley",
        ],

        rap: [
            "Offset",
            "Cardi B",
            "Megan Thee Stallion",
            "Dave Blunts",
            "Freddie Gibbs",
            "6ix9ine",
            "Muni Long",
            "Icewear Vezzo",
            "T.I.",
            "Sexyy Red",
            "Meek Mill",
            "2Pac",
            "The Notorious B.I.G.",
            "Pusha T",
            "Lil Tecca",
            "Central Cee",
            "Gunna",
            "Young Thug",
            "Lil Durk",
        ],
    };

    const artist = artistName.toLowerCase();

    console.log("Current artist:", artist);

    let relatedArtists = [];

    // Curated artists
    const curatedArtists = [];

    Object.values(categories).forEach((list) => {
        if (
            list.some(
                (name) => name.toLowerCase() === artist
            )
        ) {
            curatedArtists.push(...list);
        }
    });

    // Deezer related artists
    const deezerArtists = await getRelatedArtists(artistName);

    // Combine both lists
    relatedArtists = [
        ...curatedArtists,
        ...deezerArtists,
    ];

    const uniqueArtists = [
        ...new Set(relatedArtists),
    ]
        .filter(
            (name) =>
                name.toLowerCase() !== artist
        )
        .slice(0, 15);

    console.log("Related artists:", uniqueArtists);

    let songs = await searchTrackBrowse(uniqueArtists);

    console.log("Songs found:", songs.length);

    songs = songs.sort(() => Math.random() - 0.5);

    const seen = new Set();

    return songs.filter((song) => {
        if (seen.has(song.id)) return false;

        seen.add(song.id);

        return true;
    });
}

export async function getAlbumTracks(albumId) {
    const response = await axios.get(
        `https://api.deezer.com/album/${albumId}`
    );

    return {
        id: response.data.id,

        title: response.data.title,

        artist: response.data.artist.name,

        artistId: response.data.artist.id,

        artwork: response.data.cover_big,

        year: response.data.release_date
            ? response.data.release_date.slice(0, 4)
            : "",

        releaseDate: response.data.release_date,

        label: response.data.label,

        genres:
            response.data.genres?.data?.map((genre) => genre.name) ?? [],

        explicit:
            response.data.explicit_lyrics ??
            response.data.explicit ??
            false,

        description: null,

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

            const matches = response.data.data.filter(
                (item) =>
                    item.name.toLowerCase() === artistName
            );

            const artist =
                matches.sort((a, b) => b.nb_fan - a.nb_fan)[0] ??
                response.data.data.find(
                    (item) =>
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

        rap: [
            "Meek Mill",
            "2Pac",
            "The Notorious B.I.G.",
            "Cardi B",
            "Megan Thee Stallion",
        ],
    };

    return searchTrackBrowse(categories[category] || []);
}

// add snoop dogg eminem
// categories, rap 2000s pop '90s 
// afrikaans steve hofmeyr ricus nel 
// classical 
export async function getCategoryArtists(category) {
    const categories = {
        rock: [
            "beabadoobee",
            "Nirvana",
            "U2",
            "Cage the Elephant",
            "Mastodon",
            "In Color",
            "Matt Berninger",
            "Foo Fighters",
            "Queens of the Stone Age",
            "Dexter and The Moonrocks",
        ],

        hits: [
            "Ella Langley",
            "Harry Styles",
            "Stella Lefty",
            "Justin Bieber",
            "Noah Kahan",
            "Lady Gaga",
            "The Chainsmokers",
            "FISHER",
            "Doechii",
            "Latto",
        ],

        concert: [
            "Rod Wave",
            "Zach Brown",
            "Gracie Abrams",
            "Chris Brown",
            "Rihanna",
            "Oasis",
            "Jullian Gomes",
            "Arno Carstens",
            "Rammstein",
            "Gojira",
        ],

        chill: [
            "Cigarettes After Sex",
            "Bon Iver",
            "Novo Amor",
            "Khruangbin",
            "Men I Trust",
            "Rhye",
            "Vegyn",
            "Tycho",
            "Logic1000",
            "Sweatson Klank",
            "Poolside",
        ],

        charts: [
            "SZA",
            "Kenshi Yonezu",
            "Tame Impala",
            "Lil Baby",
            "Yung Miami",
            "Mac Miller",
            "Sam Fender",
            "HUGEL",
            "Imael Angel",
        ],

        hiphop: [
            "DaBaby",
            "Kendrick Lamar",
            "J. Cole",
            "Rick Ross",
            "Larry June",
            "Raq baby",
            "Jeezy",
            "PFG",
            "Post Malone",
            "Sleepy Hallow",
        ],

        live: [
            "Neil Young",
            "Sting",
            "Simply Red",
            "Billy Raffoul",
            "Failure",
            "Keith Urban",
            "JID",
            "Fly By Midnight",
            "Megan Maroney",
            "John Prine",
            "BigXthaPlug",
        ],

        rnb: [
            "Usher",
            "Bryson Tiller",
            "Ne-yo",
            "Frank Ocean",
            "Ari Lennox",
            "Omah Lay",
            "Ria Boss",
            "Syd",
            "Maxwell",
            "Toni Braxton",
        ],

        gospel: [
            "Anthny",
            "Israel Houghton",
            "CeCe Winans",
            "Jeremiah Paltan",
            "Kirk Franklin",
            "Maverick City Music",
            "Tasha Cobbs Leonard",
            "Elevation Worship",
            "Stevie Rizo",
            "Pastor Mike Jr.",
        ],

        dance: [
            "D.O.D",
            "Calvin Harris",
            "Kygo",
            "Gorgon City",
            "John Summit",
            "BLONDLISH",
            "Adriatique",
            "Kurtis Wells",
            "Elderbrook",
            "Alok",
            "Tiësto",
            "David Guetta",
        ],

        alternative: [
            "Beck",
            "This is Lorelei",
            "Dominic Fike",
            "Julia Wolf",
            "ROLE MODEL",
            "Phoebe Bridgers",
            "Kings Of Leon",
            "Tyler Ballgame",
            "Malcolm Todd",
            "Jawdropped",
        ],

        "2010s": [
            "Imagine Dragons",
            "OneRepublic",
            "LMFAO",
            "Hardwell",
            "Katy Perry",
            "Adele",
            "Bruno Mars",
            "Ed Sheeran",
            "Baauer",
            "Disclosure",
            "AFROJACK",
        ],

        "80s": [
            "Rick Astley",
            "John Mayer",
            "Seal",
            "The Beatles",
            "Toto",
            "Simple Minds",
            "Bryan Adams",
            "Genesis",
            "Bruce Hornsby",
            "Hot Chocolate",
        ],

        "70s": [
            "Fleetwood Mac",
            "ABBA",
            "Bee Gees",
            "Eagles",
            "Paul Simon",
            "Art Garfunkel",
            "Bread",
            "Earth, Wind & Fire",
            "Neil Diamond",
        ],

        jazz: [
            "Dean Martin",
            "Doris Day",
            "Wes Montgomery",
            "Nat King Cole",
            "Dexter Gordon",
            "Jutta Hipp",
            "Nina Simone",
            "Sarah Vaughan",
            "Miles Davis",
            "John Coltrane",
            "Ella Fitzgerald",
            "Louis Armstrong",
            "Duke Ellington",
        ],

        country: [
            "Jordan Davis",
            "Tucker Wetmore",
            "Roan Ash",
            "Keith Urban",
            "Blake Whiten",
            "Carter Faith",
            "Chris Tomlin",
            "Chris Stapleton",
            "Matthew West",
            "Shane McAnally",
            "Luke Bryan",
        ],

        essentials: [
            "Erykah Badu",
            "Anderson .Paak",
            "Mary J. Blige",
            "John Legend",
            "Solange",
            "Soul II Soul",
            "Raphael Saadiq",
            "Jamiroquai",
            "Jill Scott",
            "Common",
        ],

        focus: [
            "Calming Hearts",
            "Adam Bokesch",
            "Caio's Hub",
            "Sachiho",
            "Bazzi",
            "sunkis",
            "Matsuyama",
            "Naguro",
            "Kohei Yoshii",
            "Kozi Bella",
            "aunt",
            "Elijah Nang",
            "Melt On",
            "Kumai Goro",
        ],

        feelgood: [
            "Snoop Dogg",
            "Eminem",
            "Childish Gambino",
            "Fcukers",
            "Kid Cudi",
            "Pharrell Williams",
            "Justin Timberlake",
            "Lil Naay",
            "Anitta",
            "Noizy",
            "Saint Levant",
            "Demi Lovato",
        ],

        love: [
            "Akon",
            "Mike Posner",
            "Jason Derulo",
            "Ella Mai",
            "Sam Smith",
            "Majid Jordan",
            "Lewis Capaldi",
            "Lionel Richie",
            "Boyz II Men",
            "Brian McKnight",
            "Wale",
        ],

        party: [
            "Fatboy Slim",
            "Korolova",
            "Max Styler",
            "Dimitri Vegas",
            "Sebastian Ingrosso",
            "Tim Berg",
            "Swedish House Mafia",
            "Paul Kalkbrenner",
            "Daft Punk",
            "Otto Knows",
            "Nicky Romero",
        ],

        soulfunk: [
            "Stevie Wonder",
            "Marvin Gaye",
            "Earth, Wind & Fire",
            "James Brown",
            "Prince",
            "Aretha Franklin",
            "Amy Winehouse",
            "Rag'n'Bone Man",
        ],

        oldies: [
            "Yoko Ono",
            "Mick Fleetwood",
            "Elvis Presley",
            "Buddy Holly",
            "Ben E. King",
            "Sam Cooke",
            "Tony Bennett",
            "Jimmie Rodgers",
            "Guy Mitchell",
            "Perry Como",
            "Jo Stafford",
            "Danny Kaye",
            "Judy Garland",
        ],

        reggae: [
            "Vybz Kartel",
            "Jahmiel",
            "Zimi",
            "Bob Marley",
            "Protoje",
            "Teejay",
            "Konshens",
            "Jimmy Cliff",
            "Rvssian",
            "Tarrus Riley",
        ],

        rap: [
            "Offset",
            "Cardi B",
            "Megan Thee Stallion",
            "Dave Blunts",
            "Freddie Gibbs",
            "6ix9ine",
            "Muni Long",
            "Icewear Vezzo",
            "T.I.",
            "Sexyy Red",
            "Meek Mill",
            "2Pac",
            "The Notorious B.I.G.",
            "Pusha T",
            "Lil Tecca",
            "Central Cee",
            "Gunna",
            "Young Thug",
            "Lil Durk",
        ],
    };

    return await searchArtistBrowse(categories[category] || []);
}

export async function getCategoryAlbums(category) {
    const categories = {
        rock: [
            "beabadoobee",
            "Nirvana",
            "U2",
            "Cage the Elephant",
            "Mastodon",
            "In Color",
            "Matt Berninger",
            "Foo Fighters",
            "Queens of the Stone Age",
            "Dexter and The Moonrocks",
        ],

        hits: [
            "Ella Langley",
            "Harry Styles",
            "Stella Lefty",
            "Justin Bieber",
            "Noah Kahan",
            "Lady Gaga",
            "The Chainsmokers",
            "FISHER",
            "Doechii",
            "Latto",
        ],

        concert: [
            "Rod Wave",
            "Zach Brown",
            "Gracie Abrams",
            "Chris Brown",
            "Rihanna",
            "Oasis",
            "Jullian Gomes",
            "Arno Carstens",
            "Rammstein",
            "Gojira",
        ],

        chill: [
            "Cigarettes After Sex",
            "Bon Iver",
            "Novo Amor",
            "Khruangbin",
            "Men I Trust",
            "Rhye",
            "Vegyn",
            "Tycho",
            "Logic1000",
            "Sweatson Klank",
            "Poolside",
        ],

        charts: [
            "SZA",
            "Kenshi Yonezu",
            "Tame Impala",
            "Lil Baby",
            "Yung Miami",
            "Mac Miller",
            "Sam Fender",
            "HUGEL",
            "Imael Angel",
        ],

        hiphop: [
            "DaBaby",
            "Kendrick Lamar",
            "J. Cole",
            "Rick Ross",
            "Larry June",
            "Raq baby",
            "Jeezy",
            "PFG",
            "Post Malone",
            "Sleepy Hallow",
        ],

        live: [
            "Neil Young",
            "Sting",
            "Simply Red",
            "Billy Raffoul",
            "Failure",
            "Keith Urban",
            "JID",
            "Fly By Midnight",
            "Megan Maroney",
            "John Prine",
            "BigXthaPlug",
        ],

        rnb: [
            "Usher",
            "Bryson Tiller",
            "Ne-yo",
            "Frank Ocean",
            "Ari Lennox",
            "Omah Lay",
            "Ria Boss",
            "Syd",
            "Maxwell",
            "Toni Braxton",
        ],

        gospel: [
            "Anthny",
            "Israel Houghton",
            "CeCe Winans",
            "Jeremiah Paltan",
            "Kirk Franklin",
            "Maverick City Music",
            "Tasha Cobbs Leonard",
            "Elevation Worship",
            "Stevie Rizo",
            "Pastor Mike Jr.",
        ],

        dance: [
            "D.O.D",
            "Calvin Harris",
            "Kygo",
            "Gorgon City",
            "John Summit",
            "BLONDLISH",
            "Adriatique",
            "Kurtis Wells",
            "Elderbrook",
            "Alok",
            "Tiësto",
            "David Guetta",
        ],

        alternative: [
            "Beck",
            "This is Lorelei",
            "Dominic Fike",
            "Julia Wolf",
            "ROLE MODEL",
            "Phoebe Bridgers",
            "Kings Of Leon",
            "Tyler Ballgame",
            "Malcolm Todd",
            "Jawdropped",
        ],

        "2010s": [
            "Imagine Dragons",
            "OneRepublic",
            "LMFAO",
            "Hardwell",
            "Katy Perry",
            "Adele",
            "Bruno Mars",
            "Ed Sheeran",
            "Baauer",
            "Disclosure",
            "AFROJACK",
        ],

        "80s": [
            "Rick Astley",
            "John Mayer",
            "Seal",
            "The Beatles",
            "Toto",
            "Simple Minds",
            "Bryan Adams",
            "Genesis",
            "Bruce Hornsby",
            "Hot Chocolate",
        ],

        "70s": [
            "Fleetwood Mac",
            "ABBA",
            "Bee Gees",
            "Eagles",
            "Paul Simon",
            "Art Garfunkel",
            "Bread",
            "Earth, Wind & Fire",
            "Neil Diamond",
        ],

        jazz: [
            "Dean Martin",
            "Doris Day",
            "Wes Montgomery",
            "Nat King Cole",
            "Dexter Gordon",
            "Jutta Hipp",
            "Nina Simone",
            "Sarah Vaughan",
            "Miles Davis",
            "John Coltrane",
            "Ella Fitzgerald",
            "Louis Armstrong",
            "Duke Ellington",
        ],

        country: [
            "Jordan Davis",
            "Tucker Wetmore",
            "Roan Ash",
            "Keith Urban",
            "Blake Whiten",
            "Carter Faith",
            "Chris Tomlin",
            "Chris Stapleton",
            "Matthew West",
            "Shane McAnally",
            "Luke Bryan",
        ],

        essentials: [
            "Erykah Badu",
            "Anderson .Paak",
            "Mary J. Blige",
            "John Legend",
            "Solange",
            "Soul II Soul",
            "Raphael Saadiq",
            "Jamiroquai",
            "Jill Scott",
            "Common",
        ],

        focus: [
            "Calming Hearts",
            "Adam Bokesch",
            "Caio's Hub",
            "Sachiho",
            "Bazzi",
            "sunkis",
            "Matsuyama",
            "Naguro",
            "Kohei Yoshii",
            "Kozi Bella",
            "aunt",
            "Elijah Nang",
            "Melt On",
            "Kumai Goro",
        ],

        feelgood: [
            "Snoop Dogg",
            "Eminem",
            "Childish Gambino",
            "Fcukers",
            "Kid Cudi",
            "Pharrell Williams",
            "Justin Timberlake",
            "Lil Naay",
            "Anitta",
            "Noizy",
            "Saint Levant",
            "Demi Lovato",
        ],

        love: [
            "Akon",
            "Mike Posner",
            "Jason Derulo",
            "Ella Mai",
            "Sam Smith",
            "Majid Jordan",
            "Lewis Capaldi",
            "Lionel Richie",
            "Boyz II Men",
            "Brian McKnight",
            "Wale",
        ],

        party: [
            "Fatboy Slim",
            "Korolova",
            "Max Styler",
            "Dimitri Vegas",
            "Sebastian Ingrosso",
            "Tim Berg",
            "Swedish House Mafia",
            "Paul Kalkbrenner",
            "Daft Punk",
            "Otto Knows",
            "Nicky Romero",
        ],

        soulfunk: [
            "Stevie Wonder",
            "Marvin Gaye",
            "Earth, Wind & Fire",
            "James Brown",
            "Prince",
            "Aretha Franklin",
            "Amy Winehouse",
            "Rag'n'Bone Man",
        ],

        oldies: [
            "Yoko Ono",
            "Mick Fleetwood",
            "Elvis Presley",
            "Buddy Holly",
            "Ben E. King",
            "Sam Cooke",
            "Tony Bennett",
            "Jimmie Rodgers",
            "Guy Mitchell",
            "Perry Como",
            "Jo Stafford",
            "Danny Kaye",
            "Judy Garland",
        ],

        reggae: [
            "Vybz Kartel",
            "Jahmiel",
            "Zimi",
            "Bob Marley",
            "Protoje",
            "Teejay",
            "Konshens",
            "Jimmy Cliff",
            "Rvssian",
            "Tarrus Riley",
        ],

        rap: [
            "Offset",
            "Cardi B",
            "Megan Thee Stallion",
            "Dave Blunts",
            "Freddie Gibbs",
            "6ix9ine",
            "Muni Long",
            "Icewear Vezzo",
            "T.I.",
            "Sexyy Red",
            "Meek Mill",
            "2Pac",
            "The Notorious B.I.G.",
            "Pusha T",
            "Lil Tecca",
            "Central Cee",
            "Gunna",
            "Young Thug",
            "Lil Durk",
        ],
    };

    return await searchAlbumBrowse(categories[category] || []);
}


export async function getArtistDetails(artistId) {
    const [artistResponse, albumsResponse, tracksResponse] = await Promise.all([
        axios.get(
            `https://api.deezer.com/artist/${artistId}`
        ),

        axios.get(
            `https://api.deezer.com/artist/${artistId}/albums`
        ),

        axios.get(
            `https://api.deezer.com/artist/${artistId}/top?limit=12`
        ),
    ]);

    const artist = artistResponse.data;

    const latestAlbum = albumsResponse.data.data[0];

    const albums = albumsResponse.data.data;

    return {
        id: artist.id,

        name: artist.name,

        artwork:
            artist.picture_xl ||
            artist.picture_big ||
            artist.picture_medium,

        fans: artist.nb_fan,

        genres: [],

        about: null,

        latestAlbum: albums.length
            ? {
                id: albums[0].id,
                title: albums[0].title,
                artwork: albums[0].cover_big,
                year: albums[0].release_date
                    ? albums[0].release_date.slice(0, 4)
                    : "",
                explicit:
                    albums[0].explicit_lyrics ??
                    albums[0].explicit ??
                    false,
            }
            : null,

        latestSongs: tracksResponse.data.data.map((track) => ({
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
        })),

        albums: albums.map((album) => ({
            id: album.id,

            title: album.title,

            artwork: album.cover_big,

            year: album.release_date
                ? album.release_date.slice(0, 4)
                : "",

            explicit:
                album.explicit_lyrics ??
                album.explicit ??
                false,
        })),
    };
}
