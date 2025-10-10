import axios from "axios";

export const api = axios.create({
  baseURL: "https://burguer-night.onrender.com", // deve apontar para o backend
});
