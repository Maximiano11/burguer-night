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
    origin: "https://burguer-night-1.onrender.com",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);

app.use(express.json());

// Rotas da API
app.use("/pedidos", pedidosRouter);

// Serve arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Redireciona todas as rotas não-API para o index.html (SPA)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});


const server = http.createServer(app);

// Inicializa Socket.IO
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
