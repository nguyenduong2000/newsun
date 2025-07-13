
'use client';

import axios from 'axios';

const axiosInstance = axios.create({
  // Normally you would set the baseURL to your API endpoint.
  // For this example, we'll leave it empty as we are faking API calls.
  // baseURL: 'https://api.example.com/api',
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
    return response;
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
    return Promise.reject(error);
  }
);

export default axiosInstance;
