const express = require("express");
const http = require("http");
const cors = require("cors");
const { initSocket } = require("./socket");

const app = express();
app.use(
  cors({
    origin: "https://burguer-night.netlify.app",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());

// suas rotas aqui, ex:
const pedidosRouter = require("./routes/pedidos");
app.use("/pedidos", pedidosRouter);

const server = http.createServer(app);
initSocket(server); // 🔥 aqui inicializa o Socket.IO

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
