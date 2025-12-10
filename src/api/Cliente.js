import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || 'https://cinema-pgmd.onrender.com',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
