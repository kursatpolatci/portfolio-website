import axios from 'axios';

export const API_URL =
  import.meta.env.MODE === 'development' ? `http://localhost:5000/api` : `${import.meta.env.VITE_BACKEND_URL}/api`;
export type dialogType = 'edit' | 'add';

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});
