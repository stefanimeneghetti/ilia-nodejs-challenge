import axios from "axios";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = import.meta.env.VITE_AUTH_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
