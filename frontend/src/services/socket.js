// frontend/socket.js
import { io } from "socket.io-client";

// Apenas a URL do backend no Render
const SOCKET_URL = "https://burguer-night.onrender.com";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
});
