import axios from "axios";

const baseURL =
  import.meta.env.MODE === "production"
    ? "https://burguer-night.onrender.com" // backend no Render
    : "http://localhost:4001";             // backend local

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
