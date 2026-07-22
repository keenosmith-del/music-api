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

export async function getCategory(category) {
    const response = await fetch(
        `${API}/category/${encodeURIComponent(category)}`
    );

    if (!response.ok) {
        throw new Error("Unable to load category.");
    }

    return await response.json();
}

export async function getArtistInfo(id) {
    const response = await fetch(
        `${API}/artist-info/${id}`
    );

    if (!response.ok) {
        throw new Error("Unable to load artist.");
    }

    return await response.json();
}

export async function getPodcast(podcastId) {
    const response = await fetch(
        `${API}/podcast/${podcastId}`
    );

    if (!response.ok) {
        throw new Error("Unable to load podcast.");
    }

    return await response.json();
}

export async function getCategoryArtists(category) {
    const response = await fetch(
        `${API}/category-artists/${encodeURIComponent(category)}`
    );

    if (!response.ok) {
        throw new Error("Unable to load category artists.");
    }

    return await response.json();
}

export async function getCategoryAlbums(category) {
    const response = await fetch(
        `${API}/category-albums/${category}`
    );

    if (!response.ok) {
        throw new Error("Unable to load albums.");
    }

    return await response.json();
}

export async function getAutoplay(artist) {
    const response = await fetch(
        `${API}/autoplay/${encodeURIComponent(artist)}`
    );

    if (!response.ok) {
        throw new Error("Unable to load autoplay.");
    }

    return await response.json();
}