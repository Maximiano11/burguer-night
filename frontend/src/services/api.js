// api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://burguer-night.onrender.com", // coloque aqui a URL exata do backend no Render
  withCredentials: true,
});
