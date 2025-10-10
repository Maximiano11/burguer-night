import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import pedidosRoutes from "./routes/pedidos.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://burguer-night.netlify.app", // seu frontend
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(
  cors({
    origin: "https://burguer-night.netlify.app",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());

// Rotas
app.use("/pedidos", pedidosRoutes);

// Socket.IO
io.on("connection", (socket) => {
  console.log("Novo cliente conectado: ", socket.id);

  socket.on("novoPedido", (pedido) => {
    console.log("Pedido recebido via socket:", pedido);
    io.emit("pedidoRecebido", pedido); // envia para todos os clientes conectados
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
