import express from "express";
import cors from "cors";
import climaRoutes from "./routes/climaRoutes.js";
import noticiasRoutes from "./routes/noticiasRoute.js";
import cotacaoRoutes from "./routes/cotacaoRoutes.js";

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/clima", climaRoutes);
app.use("/api/noticias", noticiasRoutes);
app.use("/api/cotacao", cotacaoRoutes);

export default app;
