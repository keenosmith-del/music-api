import express from "express";

import {
    search,
    getAlbum,
} from "../controllers/musicController.js";

const router = express.Router();

router.get("/search", search);

router.get("/album/:id", getAlbum);

export default router;