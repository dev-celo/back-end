// src/routes/cotacaoRoutes.js

import express from 'express';
import { getCotacoesCacau } from '../controllers/cotacaoController.js';

const router = express.Router();

router.get('/', getCotacoesCacau);

export default router;
