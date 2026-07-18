const API = "http://localhost:5050/api/new";

export async function getNew() {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Unable to load New.");
    }

    return await response.json();
}