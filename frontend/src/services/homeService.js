const API = "http://localhost:5050/api/home";

export async function getHome() {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Unable to load Home.");
    }

    return await response.json();
}