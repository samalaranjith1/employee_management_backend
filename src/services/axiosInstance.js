// services/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api.example.com",
  timeout: 10000, // optional
  headers: {
    "Content-Type": "application/json",
  },
});

// Example: Add auth token automatically
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Example: Handle 401 errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login or refresh token
      console.warn("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
