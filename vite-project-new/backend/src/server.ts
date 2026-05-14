import express from "express";
import cors from "cors";
import { db } from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());
// rota raiz
app.get("/", (req, res) => {
  res.send("API funcionando");
});

// ********** ROTA DE USUÁRIOS **********
app.get("/usuarios", async (req, res) => {
  const [rows] = await db.query("SELECT * FROM usuarios");
  res.json(rows);
});

app.post("/usuarios", async (req, res) => {
  try {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: "Nome é obrigatório" });
    }

    const [result] = await db.query(
      "INSERT INTO usuarios (nome) VALUES (?)",
      [nome]
    );

    res.status(201).json({
      id: (result as any).insertId,
      nome,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});


// SEMPRE por último
app.listen(3001, () => {
  console.log("Servidor rodando em http://localhost:3001");
});