import express from "express";
import { getNew } from "../controllers/newController.js";

const router = express.Router();

router.get("/", getNew);

export default router;