import User from "../models/User.js";
import Track from "../models/Track.js";

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne()
            .populate("library")
            .populate("favourites");

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};