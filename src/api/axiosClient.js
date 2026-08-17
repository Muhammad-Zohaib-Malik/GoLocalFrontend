import axios from "axios";
import toast from "react-hot-toast";

// Define the base URL for the backend API
// Adjust the URL if your backend is hosted elsewhere
const backendBase =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL || "http://localhost:8000";
const baseURL = `${backendBase}/api/v1`;

const axiosClient = axios.create({
  baseURL,
  withCredentials: true, // For sending and receiving cookies
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // You can attach tokens or custom headers here if needed
    // const token = localStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Show toast message for responses
    const method = response.config.method?.toLowerCase();
    const message = response.data?.message;

    // Show toast for mutations (POST/PUT/PATCH/DELETE), but skip for GET requests (like page refresh)
    if (method !== "get") {
      if (message) {
        toast.success(message);
      } else if (["post", "put", "patch", "delete"].includes(method)) {
        toast.success("Operation completed successfully");
      }
    }

    return response;
  },
  (error) => {
    // Extract error message from backend
    const errorMessage =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred";

    // Show error toast
    toast.error(errorMessage);

    return Promise.reject(error);
  },
);

export default axiosClient;
