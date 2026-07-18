import express from "express";
import { getPodcasts } from "../controllers/podcastController.js";

const router = express.Router();

router.get("/", getPodcasts);

export default router;