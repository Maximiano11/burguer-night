const { Server } = require("socket.io");

let io;

function initSocket(server) {
  io = require("socket.io")(server, {
    cors: {
      origin: import.meta.env.MODE === "production"
        ? "https://burguer-night.onrender.com"
        : "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);
  });
}

function emit(event, data) {
  if (io) io.emit(event, data);
}

module.exports = { initSocket, emit };


