// backend/socket.js
const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // aqui você pode colocar apenas o domínio do front-end
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    socket.on("novoPedido", (pedido) => {
      console.log("Pedido recebido:", pedido);
      // envia para todos os clientes conectados (ou apenas para a cozinha)
      io.emit("atualizarPedidos", pedido);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });

  return io;
}

module.exports = { initSocket, io };
