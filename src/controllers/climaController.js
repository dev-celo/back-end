import { fetchClimaData } from "../services/climaService.js";

export async function getClima(req, res) {
  try {
    const clima = await fetchClimaData();
    res.json(clima);
  } catch (error) {
    console.error("Erro ao buscar clima:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
}
