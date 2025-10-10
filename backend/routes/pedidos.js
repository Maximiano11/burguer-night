import express from "express";
const router = express.Router();

// Simulação de banco de dados
let numeroPedido = 1;

router.post("/", (req, res) => {
  const { nome_cliente, quantidade_combos, refrigerantes } = req.body;

  if (!nome_cliente || !quantidade_combos || !refrigerantes) {
    return res.status(400).json({ error: "Dados incompletos do pedido" });
  }

  const pedido = {
    numero_pedido: numeroPedido++,
    nome_cliente,
    quantidade_combos,
    refrigerantes,
  };

  // Aqui você pode salvar no banco de dados

  console.log("Pedido criado:", pedido);
  res.status(201).json(pedido);
});

export default router;
