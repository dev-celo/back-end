import { fetchRSSFeeds } from "../services/noticiasService.js";

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */

export async function getNoticias(req, res) {
  try {
    const noticias = await fetchRSSFeeds();
    res.json(noticias);
  } catch (err) {
    console.error("Erro ao buscar notícias:", err);
    res.status(500).json({ error: "Erro ao buscar notícias" });
  }
}
