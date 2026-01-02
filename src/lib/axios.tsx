import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.log("❌ Axios error:", {
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data,
    });

    if (error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      // if (typeof window !== "undefined") {
      //   setTimeout(() => {
      //     window.location.href = "/login";
      //   }, 1500);
      // }
      return Promise.reject(error);
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      const message =
        error.response?.data?.message ||
        "Access denied - Admin permissions required";
      toast.error(message);
      return Promise.reject(error);
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      toast.error("Resource not found");
      return Promise.reject(error);
    }

    // Handle 500 Server Error
    if (error.response?.status >= 500) {
      toast.error("Server error. Please try again later.");
      return Promise.reject(error);
    }

    // Generic error handler
    const errorMessage =
      error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default api;
