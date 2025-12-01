import { AxiosResponse } from "axios";

export const apiRequest = async <T = unknown>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request();
    // Return just the data, not the entire AxiosResponse
    return response.data;
  } catch (error: unknown) {
    // Log the error for debugging
    console.error("API Request Error:", error);

    // Re-throw the original error so React Query and Axios interceptors can handle it
    throw error;
  }
};
