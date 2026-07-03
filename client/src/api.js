import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://hal-project-fr0t.onrender.com/api",
});

// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem("token"); // cleaner than clear()
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;