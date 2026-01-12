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

// Subscription Analytics Types
export interface SubscriptionOverview {
  totalSubscribers: number;
  activeSubscriptions: number;
  cancelledSubscriptions: number;
  expiredSubscriptions: number;
  billingBreakdown: {
    monthly: number;
    yearly: number;
  };
  totalRevenue: number;
  revenueThisMonth: number;
  currency: string;
}

export interface NewSubscribersData {
  dataPoints: { label: string; count: number }[];
  totalNewSubscribers: number;
  period: "month" | "year";
  year?: string | number;
  month?: string | number | null;
}

export interface SubscriptionUsersData {
  freeUsers: {
    count: number;
    percentage: number;
  };
  paidUsers: {
    count: number;
    percentage: number;
  };
  totalUsers: number;
}

export interface SubscriptionModelsData {
  models: { label: string; count: number }[];
}

export interface MRRData {
  dataPoints: { label: string; amount: number }[];
  totalRevenue: number;
  currency: string;
  period: "month" | "year";
  year?: string | number;
  month?: string | number | null;
}

// Subscription Overview Hook
export const useSubscriptionOverview = () => {
  return useQuery<SubscriptionOverview>({
    queryKey: ["subscription-overview"],
    queryFn: async () => {
      const result = await apiRequest(() =>
        api.get("/analytics/subscriptions/overview")
      );
      return (
        result?.data ||
        result || {
          totalSubscribers: 0,
          activeSubscriptions: 0,
          cancelledSubscriptions: 0,
          expiredSubscriptions: 0,
          billingBreakdown: { monthly: 0, yearly: 0 },
          totalRevenue: 0,
          revenueThisMonth: 0,
          currency: "NGN",
        }
      );
    },
    staleTime: 1000 * 60 * 5,
  });
};

// New Subscribers Hook
export const useNewSubscribers = ({
  period,
  year,
  month,
}: {
  period?: "month" | "year";
  year?: string;
  month?: string;
}) => {
  return useQuery<NewSubscribersData>({
    queryKey: ["new-subscribers", { period, year, month }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.append("period", period);
      if (year) params.append("year", year);
      if (month) params.append("month", month);

      const result = await apiRequest(() =>
        api.get(`/analytics/subscriptions/acquisition?${params.toString()}`)
      );
      return (
        result?.data ||
        result || {
          dataPoints: [],
          totalNewSubscribers: 0,
          period: period || "year",
          year: year || new Date().getFullYear().toString(),
          month: month || null,
        }
      );
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Subscription Users Hook
export const useSubscriptionUsers = () => {
  return useQuery<SubscriptionUsersData>({
    queryKey: ["subscription-users"],
    queryFn: async () => {
      const result = await apiRequest(() =>
        api.get("/analytics/subscriptions/distribution")
      );
      return (
        result?.data ||
        result || {
          freeUsers: { count: 0, percentage: 0 },
          paidUsers: { count: 0, percentage: 0 },
          totalUsers: 0,
        }
      );
    },
    staleTime: 1000 * 60 * 5,
  });
};

// Subscription Models Hook
export const useSubscriptionModels = () => {
  return useQuery<SubscriptionModelsData>({
    queryKey: ["subscription-models"],
    queryFn: async () => {
      const result = await apiRequest(() =>
        api.get("/analytics/subscriptions/models")
      );
      return result?.data || result || { models: [] };
    },
    staleTime: 1000 * 60 * 5,
  });
};

// MRR Hook (Revenue)
export const useMRR = ({
  period = "year",
  year,
  month,
}: {
  period?: "month" | "year";
  year?: string;
  month?: string;
}) => {
  return useQuery<MRRData>({
    queryKey: ["mrr", { period, year, month }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("period", period);
      if (year) params.append("year", year);
      if (month) params.append("month", month);

      const result = await apiRequest(() =>
        api.get(`/analytics/subscriptions/revenue?${params.toString()}`)
      );
      return (
        result?.data ||
        result || {
          dataPoints: [],
          totalRevenue: 0,
          currency: "NGN",
          period: period || "year",
          year: year || new Date().getFullYear().toString(),
          month: month || null,
        }
      );
    },
    staleTime: 1000 * 60 * 5,
  });
};

// User Stats Hook
export const useUserStats = () => {
  return useQuery({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const result = await apiRequest(() => api.get("/analytics/user-stats"));
      return result?.data || result || {};
    },
    staleTime: 1000 * 60 * 5,
  });
};
