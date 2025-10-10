import express from "express";
import { pool } from "../db.js";
import { io } from "../index.js"; // para emitir eventos em tempo real

export const pedidosRouter = express.Router();

// Opções válidas de refrigerante
const opcoesRefrigerante = ["Coca-Cola", "Coca-Zero", "Guarana"];

// Criar pedido
pedidosRouter.post("/", async (req, res) => {
  try {
    const { nome_cliente, quantidade_combos, refrigerantes } = req.body;

    // Validação básica
    if (!nome_cliente || !quantidade_combos || !refrigerantes) {
      return res.status(400).send("Todos os campos são obrigatórios.");
    }

    if (quantidade_combos !== refrigerantes.length) {
      return res.status(400).send("Cada combo precisa ter um refrigerante.");
    }

    for (let r of refrigerantes) {
      if (!opcoesRefrigerante.includes(r)) {
        return res.status(400).send(`Refrigerante inválido: ${r}`);
      }
    }

    // Pegar próximo número de pedido
    const { rows } = await pool.query(
      `SELECT MAX(numero_pedido) AS max_num FROM pedidos`
    );
    const numero_pedido = (rows[0].max_num || 0) + 1;

    const result = await pool.query(
      `INSERT INTO pedidos (numero_pedido, nome_cliente, quantidade_combos, refrigerantes) 
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [numero_pedido, nome_cliente, quantidade_combos, refrigerantes]
    );

    const pedido = result.rows[0];

    // Emitir evento em tempo real para frontend
    io.emit("novo-pedido", pedido);

    res.json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao criar pedido");
  }
});

// Listar pedidos
pedidosRouter.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM pedidos ORDER BY numero_pedido`
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar pedidos");
  }
});

// Alterar status
pedidosRouter.patch("/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await pool.query(
      `UPDATE pedidos SET status=$1 WHERE id=$2 RETURNING *`,
      [status, id]
    );

    const pedidoAtualizado = result.rows[0];

    // Emitir atualização em tempo real
    io.emit("atualizacao-status", pedidoAtualizado);

    res.json(pedidoAtualizado);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar status");
  }
});
