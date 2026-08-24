const API = "http://localhost:5050/api/user";

export async function getUser() {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Unable to load user.");
    }

    return await response.json();
}

export async function toggleFavourite(song) {
    const response = await fetch(`${API}/favourite`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            song,
        }),
    });

    if (!response.ok) {
        throw new Error("Unable to update favourite.");
    }

    return await response.json();
}

export async function addToLibrary(song) {
    const response = await fetch(`${API}/library`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            song,
        }),
    });

    if (!response.ok) {
        throw new Error("Unable to add song to library.");
    }

    return await response.json();
}

export async function removeFromLibrary(song) {
    const response = await fetch(`${API}/library`, {
        method: "DELETE",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            song,
        }),
    });

    if (!response.ok) {
        throw new Error("Unable to remove song from library.");
    }

    return await response.json();
}