const express = require("express");
const http = require("http");
const cors = require("cors");
const { initSocket } = require("./socket");
const pedidosRouter = require("./routes/pedidos");

const app = express();
app.use(
  cors({
    origin: "https://burguer-night-1.onrender.com",
    methods: ["GET", "POST", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());

// Rotas
app.use("/pedidos", pedidosRouter);

const server = http.createServer(app);

// Inicializa Socket.IO
initSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
