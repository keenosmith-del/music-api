import {
    searchTracks as searchDeezerTracks,
    getAlbumTracks as getDeezerAlbumTracks,
} from "./providers/deezerService.js";

export async function searchTracks(query) {
    return await searchDeezerTracks(query);
}

export async function getAlbumTracks(albumId) {
    return await getDeezerAlbumTracks(albumId);
}