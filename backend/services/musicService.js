import {
    searchTracks as searchDeezerTracks,
    getAlbumTracks as getDeezerAlbumTracks,
    searchTracksByArtist as searchDeezerTracksByArtist,
    getCategoryTracks as getDeezerCategoryTracks,
    getArtistDetails as getDeezerArtistDetails,
} from "./providers/deezerService.js";

import {
    getPodcastDetails as getItunesPodcastDetails,
} from "./providers/itunesPodcastService.js";

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

export async function getArtistDetails(artistId) {
    return await getDeezerArtistDetails(artistId);
}

export async function getPodcastDetails(id) {
    return await getItunesPodcastDetails(id);
}
