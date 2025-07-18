import express from "express";
import climaRouter from "./routes/climaRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/clima", climaRouter);

export default app;

if (process.env.NODE_ENV !== "test") {
  app.listen(3001, () => console.log("API rodando na porta 3001"));
}
