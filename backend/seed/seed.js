import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "../models/User.js";
import Playlist from "../models/Playlist.js";
import Track from "../models/Track.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

console.log("Connected to MongoDB");

await User.deleteMany({});
await Playlist.deleteMany({});
await Track.deleteMany({});

console.log("Database cleared");

const user = await User.create({
    name: "Keeno Smith",
    email: "keeno@example.com",

    theme: "dark",

    library: [],

    favourites: [],

    recentlyPlayed: [],
});

console.log("User created");

const tracks = await Track.insertMany([
    {
        title: "Birds of a Feather",
        artist: "Billie Eilish",
        album: "Hit Me Hard and Soft",
        duration: 222,
        explicit: false,
        genre: "Pop",
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        album: "After Hours",
        duration: 200,
        explicit: false,
        genre: "Pop",
    },
    {
        title: "HUMBLE.",
        artist: "Kendrick Lamar",
        album: "DAMN.",
        duration: 177,
        explicit: true,
        genre: "Hip Hop",
    },
    {
        title: "Yellow",
        artist: "Coldplay",
        album: "Parachutes",
        duration: 269,
        explicit: false,
        genre: "Rock",
    },
]);

const playlist = await Playlist.create({
    name: "Recently Played",

    description: "Demo playlist",

    tracks: tracks.map((track) => track._id),
});

console.log("Playlist created");

user.library = tracks.map((track) => track._id);

user.favourites = [tracks[0]._id, tracks[2]._id];

await user.save();

console.log("User updated");

console.log("Database seeded");

await mongoose.disconnect();

process.exit();