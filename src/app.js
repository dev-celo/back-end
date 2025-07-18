import express from "express";
import cors from "cors";
import climaRoutes from "./routes/climaRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/clima", climaRoutes);


export default app;
