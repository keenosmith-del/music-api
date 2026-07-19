import express from "express";

import {
    search,
    getAlbum,
    getArtist,
} from "../controllers/musicController.js";

const router = express.Router();

router.get("/search", search);

router.get("/album/:id", getAlbum);

router.get("/artist/:name", getArtist);

export default router;