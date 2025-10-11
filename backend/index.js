const express = require("express");
const http = require("http");
const cors = require("cors");
const path = require("path");
const { initSocket } = require("./socket");
const pedidosRouter = require("./routes/pedidos");

const app = express();

// Configuração de CORS
app.use(
  cors({
    origin: import.meta.env.MODE === "production"
      ? "https://burguer-night.onrender.com" // URL do frontend no Render
      : "http://localhost:5173",             // URL do frontend local (Vite padrão)
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

// Rotas da API
app.use("/pedidos", pedidosRouter);

// Serve arquivos estáticos do frontend (SPA)
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Redireciona todas as rotas não-API para o index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Cria servidor HTTP
const server = http.createServer(app);

// Inicializa Socket.IO
initSocket(server);

const PORT = import.meta.env.MODE || 4001;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
