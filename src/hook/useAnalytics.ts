import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiHandler";
import api from "@/lib/axios";

// Define the expected shape of your analytics data.
// You should adjust this to match your actual API response.
export interface AnalyticsOverview {
  activeUsers: {
    total: number;
    topLocations: { country: string; count: number; percentage: number }[];
  };
  ageGroupDistribution: { count: number; label: string }[];
  summary: {
    activeSubscriptions: number;
    newSignups: number;
    resumeUploads: number;
    totalUsers: number;
  };
}

export const useAnalyticsOverview = () => {
  return useQuery<AnalyticsOverview>({
    queryKey: ["analytics-overview"],
    queryFn: () => {
      return apiRequest(() => api.get("/analytics/overview"));
    },
    staleTime: 1000 * 60 * 5,
  });
};
