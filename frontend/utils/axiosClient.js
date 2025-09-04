import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim() !== ''
  ? import.meta.env.VITE_API_URL
  : '';

if (baseURL === '' && typeof window !== 'undefined') {

  console.warn('[axiosClient] VITE_API_URL not set; using relative paths via Vite proxy');
}

const API = axios.create({
  baseURL,
  withCredentials: true
});

export default API;
