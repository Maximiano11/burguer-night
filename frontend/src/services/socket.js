import { io } from "socket.io-client";

const SOCKET_URL =
  import.meta.env.MODE === "production"
    ? "https://burguer-night.onrender.com"
    : "http://localhost:4001";

export const socket = io(SOCKET_URL);
