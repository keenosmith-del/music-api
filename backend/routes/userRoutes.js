import express from "express";

import {
    getUser,
    toggleFavourite,
    addToLibrary,
    removeFromLibrary,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);

router.post("/favourite", toggleFavourite);

router.post("/library", addToLibrary);

router.delete("/library", removeFromLibrary);

export default router;