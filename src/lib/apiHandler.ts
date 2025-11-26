import axios from "axios";

export async function apiRequest<T>(
  callback: () => Promise<{ data: T }>
): Promise<T> {
  try {
    const response = await callback();
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data.message || "Something went wrong, try again later";
      throw new Error(message);
    }
    throw error;
  }
}
