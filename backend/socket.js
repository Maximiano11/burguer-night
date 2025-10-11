// socket.js (ES Modules)
import { Server } from "socket.io";

export function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin:
        process.env.NODE_ENV === "production"
          ? "https://burguer-night.onrender.com"
          : "http://localhost:5173",
      methods: ["GET", "POST", "PATCH"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);

    socket.on("disconnect", () => {
      console.log("Cliente desconectou:", socket.id);
    });
  });
}
