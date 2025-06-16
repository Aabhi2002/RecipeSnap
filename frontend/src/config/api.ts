export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
};

export const ENDPOINTS = {
  RECIPES: {
    ANALYZE: "/recipes/analyze",
    SUGGEST: "/recipes/suggest",
  },
  HEALTH: "/health",
};
