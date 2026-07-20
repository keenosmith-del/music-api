const API = "http://localhost:5050/api/user";

export async function getUser() {
    const response = await fetch(API);

    if (!response.ok) {
        throw new Error("Unable to load user.");
    }

    return await response.json();
}