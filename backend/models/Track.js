import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
    {

        deezerId: {
            type: Number,
            required: true,
            unique: true,
        },

        albumId: {
            type: Number,
            default: null,
        },

        artistId: {
            type: Number,
            default: null,
        },

        title: {
            type: String,
            required: true,
            trim: true,
        },

        artist: {
            type: String,
            required: true,
            trim: true,
        },

        album: {
            type: String,
            default: "",
            trim: true,
        },

        artwork: {
            type: String,
            default: "",
        },

        preview: {
            type: String,
            default: "",
        },

        duration: {
            type: Number,
            required: true,
        },

        explicit: {
            type: Boolean,
            default: false,
        },

        genre: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Track", trackSchema);