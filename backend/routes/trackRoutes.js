import express from "express";
import { getTracks } from "../controllers/trackController.js";

const router = express.Router();

router.get("/", getTracks);

export default router;