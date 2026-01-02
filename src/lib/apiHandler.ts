import { AxiosResponse } from "axios";

export const apiRequest = async <T = unknown>(
  request: () => Promise<AxiosResponse<T>>
): Promise<T> => {
  try {
    const response = await request();
    return response.data;
  } catch (error: unknown) {
    console.error("API Request Error:", error);
    throw error;
  }
};
