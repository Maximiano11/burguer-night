import { pool } from "../db.js";

export async function criarTabelaPedidos() {
  const query = `
    CREATE TABLE IF NOT EXISTS pedidos (
      id SERIAL PRIMARY KEY,
      numero_pedido INTEGER UNIQUE,
      nome_cliente TEXT NOT NULL,
      quantidade_combos INTEGER NOT NULL,
      refrigerantes TEXT[],
      status TEXT DEFAULT 'Pendente',
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
  console.log("Tabela pedidos criada ou já existente.");
}

criarTabelaPedidos();
