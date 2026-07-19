const API = "http://localhost:5050/api/music";

export async function searchMusic(query) {
    const response = await fetch(
        `${API}/search?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Unable to search music.");
    }

    return await response.json();
}

export async function getAlbum(albumId) {
    const response = await fetch(
        `${API}/album/${albumId}`
    );

    if (!response.ok) {
        throw new Error("Unable to load album.");
    }

    return await response.json();
}

export async function getArtist(artistName) {
    const response = await fetch(
        `${API}/artist/${encodeURIComponent(artistName)}`
    );

    if (!response.ok) {
        throw new Error("Unable to load artist.");
    }

    return await response.json();
}