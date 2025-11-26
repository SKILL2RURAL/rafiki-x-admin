import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";
const api = axios.create({
  baseURL: "/api",
  withCredentials: true, // Ensures cookies are sent with requests
});

api.interceptors.request.use(async (config) => {
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    console.log("error", error);
    if (error.code === "ERR_NETWORK") {
      toast.error("Network error. Please check your internet connection.");
      return Promise.reject(error);
    }

    if (error.response?.status === 403) {
      toast.error("You are not authorized to access this resource");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
