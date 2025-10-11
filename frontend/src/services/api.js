import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://burguer-night.onrender.com" // backend no Render
    : "http://localhost:4001";            // backend local

export const api = axios.create({
  baseURL,
  // withCredentials: true, // só se realmente precisar de cookies
});
