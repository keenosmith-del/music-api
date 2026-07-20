import {
    searchTracks as searchDeezerTracks,
    getAlbumTracks as getDeezerAlbumTracks,
    searchTracksByArtist as searchDeezerTracksByArtist,
    getCategoryTracks as getDeezerCategoryTracks,
} from "./providers/deezerService.js";

export async function searchTracks(query) {
    return await searchDeezerTracks(query);
}

export async function getAlbumTracks(albumId) {
    return await getDeezerAlbumTracks(albumId);
}

export async function getArtistTracks(artistName) {
    return await searchDeezerTracksByArtist(artistName);
}

export async function getCategoryTracks(category) {
    return await getDeezerCategoryTracks(category);
}
