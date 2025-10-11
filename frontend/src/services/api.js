// frontend/services/api.js
import axios from "axios";

// Apenas a URL do backend no Render
export const api = axios.create({
  baseURL: "https://burguer-night.onrender.com",
  withCredentials: true,
});
