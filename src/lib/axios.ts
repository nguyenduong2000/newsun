
'use client';

import axios from 'axios';
import { API_ENDPOINTS } from '@/config/endpoints';

const axiosInstance = axios.create({
  // The base URL is now read from the environment variable
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // Only run on client-side
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
    // The API response is nested under a `data` key. 
    // We can extract it here to simplify data access in the services.
    if (response.data && response.data.data) {
        return response.data.data;
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // On client-side, if we get a 401, we want to log the user out and redirect to login
      if (typeof window !== 'undefined') {
        console.log('Session expired or invalid. Logging out.');
        localStorage.removeItem('accessToken');
        // This will trigger the AuthProvider to update state and redirect
        // We can't use hooks here, so we reload the page to the login.
        // The PrivateRoute or AuthProvider will handle the redirect.
        window.location.href = '/login'; 
      }
    }
     // Log the error for debugging purposes
    console.error('API Call Error:', {
        message: error.message,
        url: error.config.url,
        method: error.config.method,
        response: error.response?.data,
    });
    return Promise.reject(error);
  }
);

export default axiosInstance;
