import axios from 'axios';

// Base URL for API (same host as orchids: .../api)
const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/orchids\/?$/, '');
const CATEGORIES_URL = API_BASE ? `${API_BASE.replace(/\/$/, '')}/categories` : '/api/categories';

export async function fetchCategories() {
  const response = await axios.get(CATEGORIES_URL);
  return response.data;
}
