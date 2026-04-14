const rawApiBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();

const normalizeApiBaseUrl = (url: string) => {
  const baseUrl = url.replace(/\/+$/, "");
  if (/^https?:\/\//.test(baseUrl) && !baseUrl.endsWith("/api")) {
    return `${baseUrl}/api`;
  }
  return baseUrl;
};

export const API_BASE_URL = rawApiBaseUrl ? normalizeApiBaseUrl(rawApiBaseUrl) : "/api";
