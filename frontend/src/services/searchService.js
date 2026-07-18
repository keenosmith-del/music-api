const API = "http://localhost:5050/api/search";

export async function searchMusic(query) {
    const response = await fetch(
        `${API}?q=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error("Unable to search music.");
    }

    return await response.json();
}