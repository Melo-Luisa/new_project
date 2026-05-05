import express from "express";
import cors from "cors";
import { db } from "./database.js";

const app = express();
app.use(cors());

app.get("/usuarios", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM usuarios");
  res.json(rows);
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});