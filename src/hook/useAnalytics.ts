import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiHandler";
import api from "@/lib/axios";

// Define the expected shape of your analytics data based on actual API response
export interface AnalyticsOverview {
  activeUsers?: {
    total: number;
    topLocations: { country: string; count: number; percentage: number }[];
  };
  ageGroupDistribution?: { count: number; label: string }[];
  summary?: {
    activeSubscriptions: number;
    newSignups: number;
    resumeUploads: number;
    totalUsers: number;
  };
}

export const useAnalyticsOverview = () => {
  return useQuery<AnalyticsOverview>({
    queryKey: ["analytics-overview"],
    queryFn: async () => {
      const result: any = await apiRequest(() => api.get("/analytics/overview"));
      
      // Return the data from the API response
      // If the API returns { success, message, data }, extract data
      // Otherwise return the result as-is with safe defaults
      return result?.data || result || {};
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};