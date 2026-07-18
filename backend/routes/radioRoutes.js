import express from "express";
import { getRadio } from "../controllers/radioController.js";

const router = express.Router();

router.get("/", getRadio);

export default router;