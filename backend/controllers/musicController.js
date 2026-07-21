import {
    searchTracks,
    getAlbumTracks,
    getArtistTracks,
    getCategoryTracks,
    getArtistDetails,
    getPodcastDetails,
} from "../services/musicService.js";

export async function search(req, res) {
    try {
        const { q } = req.query;

        const results = await searchTracks(q);

        res.json(results);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Music search failed.",
        });
    }
}

export async function getAlbum(req, res) {
    try {
        const album = await getAlbumTracks(req.params.id);

        res.json(album);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load album.",
        });
    }
}

export async function getArtist(req, res) {
    try {
        const tracks = await getArtistTracks(req.params.name);

        res.json(tracks);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load artist.",
        });
    }
}

export async function getCategory(req, res) {
    try {
        const tracks = await getCategoryTracks(req.params.category);

        res.json(tracks);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load category.",
        });
    }
}

export async function getArtistInfo(req, res) {
    try {
        const artist = await getArtistDetails(req.params.id);

        res.json(artist);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load artist.",
        });
    }
}

export async function getPodcast(req, res) {
    try {
        const podcast = await getPodcastDetails(req.params.id);

        res.json(podcast);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load podcast.",
        });
    }
}