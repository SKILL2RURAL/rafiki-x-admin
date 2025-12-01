import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiHandler";
import api from "@/lib/axios";

export interface AnalyticsOverview {
  activeUsers?: {
    total: number;
    topLocations: { country: string; count: number; percentage: number }[];
    locations: { country: string; count: number; percentage: number }[];
  };
  ageGroupDistribution: { count: number; label: string }[];
  genderDistribution: Record<string, number>;
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
    queryFn: async () => {
      const result = await apiRequest(() => api.get("/analytics/overview"));
      return result?.data || result || {};
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
