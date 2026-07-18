const API = "http://localhost:5050/api/podcasts";

export async function getPodcasts() {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Unable to load Podcasts.");
    }

    return await response.json();
}