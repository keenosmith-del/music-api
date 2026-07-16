import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        theme: {
            type: String,
            enum: ["light", "dark"],
            default: "dark",
        },

        favourites: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Track",
            },
        ],

        library: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Track",
            },
        ],

        recentlyPlayed: [
            {
                track: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Track",
                },

                playedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);