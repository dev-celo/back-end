// src/controllers/cotacaoController.js

import { buscarCotacoesCacau } from '../services/cotacaoService.js';

/**
 * Controller para retornar cotações do cacau
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function getCotacoesCacau(req, res) {
  try {
    const cotacoes = await buscarCotacoesCacau();
    res.json(cotacoes);
  } catch (error) {
    console.error('Erro no controller de cotações:', error);
    res.status(500).json({ error: 'Erro ao buscar cotações do cacau' });
  }
}
