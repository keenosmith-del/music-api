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
            track.title.toLowerCase().includes(term)
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

    const albums = albumsResponse.data.data
        .filter((album) =>
            album.title.toLowerCase().includes(term)
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

export async function searchAlbumBrowse(artists) {
    const artistList = Array.isArray(artists)
        ? artists
        : [artists];

    const responses = await Promise.all(
        artistList.map((artist) =>
            axios.get(
                `https://api.deezer.com/search?q=${encodeURIComponent(artist)}`
            )
        )
    );

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
        artistList.map((artist) =>
            axios.get(
                `https://api.deezer.com/search?q=${encodeURIComponent(artist)}`
            )
        )
    );

    const songs = [];
    const seen = new Set();

    responses.forEach((response, index) => {
        const artistName = artistList[index].toLowerCase();

        const track = response.data.data.find(
            (track) =>
                track.artist.name.toLowerCase().includes(artistName)
        );

        if (!track) return;

        songs.push({
            id: track.id,
            title: track.title,
            artist: track.artist.name,
            artwork: track.album.cover_big,
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
