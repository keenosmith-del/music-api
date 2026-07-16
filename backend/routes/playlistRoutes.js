import express from "express";
import { getPlaylists } from "../controllers/playlistController.js";

const router = express.Router();

router.get("/", getPlaylists);

export default router;