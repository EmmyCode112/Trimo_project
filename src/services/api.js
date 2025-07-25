import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API endpoints
export const authAPI = {
  login: async (credentials) => {
    try {
      const response = await api.post("/user/login", credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/user/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  verifyOTP: async (otp) => {
    try {
      const response = await api.post("/user/verify-otp", { otp });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  completeProfile: async (profileData) => {
    try {
      const response = await api.post("/user/complete-profile", profileData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default api;
