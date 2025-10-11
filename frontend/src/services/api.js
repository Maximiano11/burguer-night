import axios from "axios";

const isRender = window.location.hostname.includes("onrender.com");

const baseURL = isRender
  ? "https://burguer-night.onrender.com" // backend no Render
  : "http://localhost:4001";              // backend local

export const api = axios.create({
  baseURL,
  withCredentials: true,
});
