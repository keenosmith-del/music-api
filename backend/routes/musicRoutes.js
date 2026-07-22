import express from "express";

import {
    search,
    getAlbum,
    getArtist,
    getCategory,
    getArtistInfo,
    getPodcast,
    getCategoryArtistList,
    getAutoplayQueue,
} from "../controllers/musicController.js";

const router = express.Router();

router.get("/search", search);

router.get("/album/:id", getAlbum);

router.get("/artist/:name", getArtist);

router.get("/category/:category", getCategory);

router.get("/artist-info/:id", getArtistInfo);

router.get("/podcast/:id", getPodcast);

router.get("/category-artists/:category", getCategoryArtistList);

router.get("/autoplay/:artist", getAutoplayQueue);

export default router;