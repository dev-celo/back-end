import { Router } from "express";
import * as postController from "../controllers/postController.js";

const router = Router();

router.post("/", postController.criar);
router.get("/", postController.listar);
router.get("/:id", postController.obter);
router.put("/:id", postController.atualizar);
router.delete("/:id", postController.deletar);

export default router;