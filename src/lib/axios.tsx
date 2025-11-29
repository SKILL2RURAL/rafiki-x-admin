import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Helper function to get cookie value
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  
  return null;
}

// Request interceptor to attach auth token
api.interceptors.request.use(
  async (config) => {
    try {
      // Get the Clerk session token from __session cookie
      const sessionToken = getCookie("__session");
      
      // If token exists, add it to Authorization header as Bearer token
      if (sessionToken) {
        config.headers.Authorization = `Bearer ${sessionToken}`;
      } else {
        console.warn("⚠️ No Clerk session token found in cookies!");
      }

      return config;
    } catch (error) {
      console.error("❌ Request interceptor error:", error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log("✅ Response success:", {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.log("❌ Full Axios error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      url: error.config?.url,
      method: error.config?.method,
      requestHeaders: error.config?.headers,
      responseData: error.response?.data,
      responseHeaders: error.response?.headers,
    });
    
    if (error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again.");
      if (typeof window !== "undefined") {
        document.cookie = "__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setTimeout(() => {
          window.location.href = "/sign-in";
        }, 1500);
      }
      return Promise.reject(error);
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      const message = error.response?.data?.message || "Access denied - You may not have admin permissions";
      toast.error(message);
      console.error("🚫 403 Forbidden Details:", {
        message: error.response?.data?.message,
        backend: process.env.NEXT_PUBLIC_API_URL || "External API",
        possibleIssues: [
          "Backend not recognizing the Clerk JWT token",
          "User doesn't have admin role in backend database",
          "Backend authentication middleware configuration issue",
          "Token validation failing on backend"
        ]
      });
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
    const errorMessage = error.response?.data?.message || error.message || "Something went wrong";
    toast.error(errorMessage);

    return Promise.reject(error);
  }
);

export default api;