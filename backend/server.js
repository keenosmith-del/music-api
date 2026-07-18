import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";
import trackRoutes from "./routes/trackRoutes.js";
import musicRoutes from "./routes/musicRoutes.js";

import homeRoutes from "./routes/homeRoutes.js";
import newRoutes from "./routes/newRoutes.js";
import radioRoutes from "./routes/radioRoutes.js";
import podcastRoutes from "./routes/podcastRoutes.js";

import searchRoutes from "./routes/searchRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/user", userRoutes);
app.use("/api/playlists", playlistRoutes);
app.use("/api/tracks", trackRoutes);
app.use("/api/music", musicRoutes);

app.use("/api/home", homeRoutes);
app.use("/api/new", newRoutes);
app.use("/api/radio", radioRoutes);
app.use("/api/podcasts", podcastRoutes);

app.use("/api/search", searchRoutes);


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

app.get("/", (req, res) => {
    res.send("Music API Backend Running");
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});