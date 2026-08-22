import User from "../models/User.js";
import Track from "../models/Track.js";
import Playlist from "../models/Playlist.js";

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

export const toggleFavourite = async (req, res) => {
    try {
        const { song } = req.body;

        const deezerId = song?.deezerId ?? song?.id;

        if (!deezerId) {
            return res.status(400).json({
                message: "Song is required.",
            });
        }

        const user = await User.findOne();

        if (!user) {
            return res.status(404).json({
                message: "User not found.",
            });
        }

        let track = await Track.findOne({
            deezerId,
        });

        if (!track) {
            track = await Track.create({
                deezerId: song.id,

                title: song.title,

                artist: song.artist,

                album: song.album || "",

                artwork: song.artwork || "",

                duration: song.duration,

                explicit: song.explicit ?? false,
            });
        }

        const alreadyFavourite = user.favourites.some(
            (favouriteId) =>
                favouriteId.toString() === track._id.toString()
        );

        // Find the system Favourite Songs playlist
        let favouritePlaylist = await Playlist.findOne({
            name: "Favourite Songs",
            isSystem: true,
        });

        if (alreadyFavourite) {
            // Remove from user's favourites
            await User.updateOne(
                { _id: user._id },
                {
                    $pull: {
                        favourites: track._id,
                    },
                }
            );

            // Remove from Favourite Songs playlist
            if (favouritePlaylist) {
                await Playlist.updateOne(
                    { _id: favouritePlaylist._id },
                    {
                        $pull: {
                            tracks: track._id,
                        },
                    }
                );
            }

            // Remove the Track document because it is no longer
            // referenced by favourites or the Favourite Songs playlist
            await Track.deleteOne({
                _id: track._id,
            });
        } else {
            // Add to user's favourites
            await User.updateOne(
                { _id: user._id },
                {
                    $addToSet: {
                        favourites: track._id,
                    },
                }
            );

            // Create Favourite Songs playlist if it doesn't exist
            if (!favouritePlaylist) {
                favouritePlaylist = await Playlist.create({
                    name: "Favourite Songs",

                    description: "Songs you've favourited.",

                    artwork: "",

                    isSystem: true,

                    tracks: [track._id],
                });
            } else {
                // Add track to Favourite Songs playlist
                await Playlist.updateOne(
                    { _id: favouritePlaylist._id },
                    {
                        $addToSet: {
                            tracks: track._id,
                        },
                    }
                );
            }
        }

        const updatedUser = await User.findById(user._id)
            .populate("library")
            .populate("favourites");

        res.status(200).json({
            user: updatedUser,
            favourite: !alreadyFavourite,
        });
    } catch (error) {
        console.error("Toggle favourite error:", error);

        res.status(500).json({
            message: error.message,
        });
    }
};