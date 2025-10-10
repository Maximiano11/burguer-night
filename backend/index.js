const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { initSocket } = require("./socket");
const pedidosRouter = require("./routes/pedidos");

const app = express();

// CORS configurado para dev e produção
const allowedOrigins = [
  "http://localhost:5173", // frontend dev (Vite)
  "https://burguer-night-1.onrender.com" // produção
];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PATCH"],
  credentials: true,
}));

app.use(express.json());

// Rotas da API
app.use("/pedidos", pedidosRouter);

// Serve frontend estático
const frontendDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendDist));

// Redireciona todas as rotas não-API para o index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendDist, "index.html"));
});

const server = http.createServer(app);

// Inicializa Socket.IO
initSocket(server);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
