import axios from "axios";

const API = axios.create({
  baseURL: "https://hal-project-fr0t.onrender.com/api",
  timeout: 15000, // prevents hanging requests
});

// Attach token automatically
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expired or invalid → auto logout
      localStorage.clear();
      window.location.href = "/";
    }

    return Promise.reject(error);
  }
);

export default API;