import axios from 'axios';
import { getTokenCookie } from './cookie';

const api = axios.create({
  baseURL: 'https://projeto-de-software-production.up.railway.app',
});

api.interceptors.request.use((config) => {
  const token = getTokenCookie();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
