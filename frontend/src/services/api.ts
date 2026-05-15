import axios from "axios";

const configuredApiUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "/api";

function normalizeApiBaseUrl(value: string) {
  const baseUrl = value.trim().replace(/\/+$/, "");
  if (!baseUrl) return "/api";
  return baseUrl.endsWith("/api") ? baseUrl : `${baseUrl}/api`;
}

const apiBaseUrl = normalizeApiBaseUrl(configuredApiUrl);

export const api = axios.create({
  baseURL: apiBaseUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
