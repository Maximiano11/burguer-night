// backend/index.js
import express from "express";
import http from "http";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { initSocket } from "./socket.js";
import pedidosRouter from "./routes/pedidos.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuração de CORS
app.use(cors({
  origin: "https://burguer-night-1.onrender.com", // front no Render
  credentials: true,
}));

app.use(express.json());

// Rotas da API
app.use("/pedidos", pedidosRouter);

// Serve arquivos estáticos do frontend (SPA)
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Redireciona todas as rotas não-API para o index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Cria servidor HTTP
const server = http.createServer(app);

// Inicializa Socket.IO
initSocket(server);

const PORT = process.env.PORT || 4001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
