const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "https://burguer-night.netlify.app", // coloque o domínio exato do seu frontend
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    socket.on("novoPedido", (pedido) => {
      console.log("Pedido recebido:", pedido);
      // envia para todos os clientes conectados
      io.emit("atualizarPedidos", pedido);
    });

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });

  return io;
}

module.exports = { initSocket, io };
