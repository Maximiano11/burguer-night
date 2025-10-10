const { Server } = require("socket.io");

let io;

function initSocket(server) {
  const { Server } = require("socket.io");
  io = new Server(server, {
    cors: {
      origin: "https://burguer-night-1.onrender.com",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado: " + socket.id);
  });
}

function getIO() {
  if (!io) {
    throw new Error("Socket.io não inicializado!");
  }
  return io;
}

module.exports = { initSocket, getIO };

