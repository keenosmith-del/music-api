export async function getRadio() {
    const response = await fetch("http://localhost:5050/api/radio");

    if (!response.ok) {
        throw new Error("Unable to load radio.");
    }

    return response.json();
}