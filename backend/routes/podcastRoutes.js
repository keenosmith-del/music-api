import express from "express";

import {
    getPodcasts,
    getPodcast,
} from "../controllers/podcastController.js";

const router = express.Router();

router.get("/", getPodcasts);
router.get("/play", getPodcast);

export default router;