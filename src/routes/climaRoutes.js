import express from "express";
import { getClima } from "../controllers/climaController.js";

const router = express.Router();

router.get("/", getClima);

export default router;
