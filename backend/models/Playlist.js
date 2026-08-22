import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            default: "",
            trim: true,
        },

        artwork: {
            type: String,
            default: "",
        },

        isSystem: {
            type: Boolean,
            default: false,
        },

        tracks: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Track",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Playlist", playlistSchema);