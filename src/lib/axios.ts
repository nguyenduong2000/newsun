
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data && response.data.data !== undefined) {
        return response.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        console.log('Session expired or invalid. Logging out.');
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      }
    }
    console.error('API Call Error:', {
        message: error.message,
        url: error.config?.url,
        method: error.config?.method,
        response: error.response?.data,
    });
    // Ensure the promise is always rejected on error
    return Promise.reject(error);
  }
);

export default axiosInstance;
