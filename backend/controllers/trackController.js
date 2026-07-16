import Track from "../models/Track.js";

export const getTracks = async (req, res) => {
    try {
        const tracks = await Track.find();

        res.status(200).json(tracks);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};