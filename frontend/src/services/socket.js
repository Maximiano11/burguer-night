import { io } from "socket.io-client";

const SOCKET_URL =
  process.env.NODE_ENV === "production"
    ? "https://burguer-night.onrender.com"
    : "http://localhost:4001";

export const socket = io(SOCKET_URL);
