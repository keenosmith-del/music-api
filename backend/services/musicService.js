import {
    searchTracks as searchDeezerTracks,
    getAlbumTracks as getDeezerAlbumTracks,
    searchTracksByArtist as searchDeezerTracksByArtist,
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