const TOKEN_URL = "https://accounts.spotify.com/api/token";

let accessToken = null;
let expiresAt = 0;

async function getAccessToken() {
    if (accessToken && Date.now() < expiresAt) {
        return accessToken;
    }

    const credentials = Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
    ).toString("base64");

    const response = await fetch(TOKEN_URL, {
        method: "POST",
        headers: {
            Authorization: `Basic ${credentials}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
        }),
    });

    if (!response.ok) {
        const error = await response.text();

        console.error("Spotify Auth Error:");
        console.error(error);

        throw new Error("Unable to authenticate with Spotify.");
    }

    const data = await response.json();

    accessToken = data.access_token;
    expiresAt = Date.now() + (data.expires_in - 60) * 1000;

    return accessToken;
}

export async function searchTracks(query) {
    const token = await getAccessToken();

    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();

        console.error("Spotify Search Error:");
        console.error(error);

        throw new Error("Spotify search failed.");
    }

    return await response.json();
}