const API = "http://localhost:5050/api/playlists";

export async function getPlaylists() {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Unable to load playlists.");
    }

    return await response.json();
}