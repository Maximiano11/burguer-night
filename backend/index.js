import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import { pedidosRouter } from "./routes/pedidos.js";
import "./models/pedido.js"; // cria a tabela

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// Rotas
app.use("/api/pedidos", pedidosRouter);

// Socket.IO
import { createServer } from "http";
import { Server } from "socket.io";
const server = createServer(app);
export const io = new Server(server, {
  cors: { origin: process.env.FRONTEND_URL },
});

// Start
server.listen(process.env.PORT || 4001, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 4001}`);
});
