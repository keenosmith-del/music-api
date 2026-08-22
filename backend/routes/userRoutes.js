import express from "express";

import {
    getUser,
    toggleFavourite,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUser);

router.post("/favourite", toggleFavourite);

export default router;