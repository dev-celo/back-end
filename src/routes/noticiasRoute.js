import express from "express";
import { getNoticias } from "../controllers/noticiasController.js";

const router = express.Router();

router.get("/", getNoticias);

export default router;
