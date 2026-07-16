import Playlist from "../models/Playlist.js";
import Track from "../models/Track.js";

export const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find()
            .populate("tracks");

        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};