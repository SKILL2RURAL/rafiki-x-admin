"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiHandler";
import api from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";

// -----------------------------
// TYPES
// -----------------------------
export interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  joinedDate: string;
  status: "active" | "deactivated";
  avatarUrl: string | null;
}

export interface CurrentPlan {
  subscriptionId: number;
  plan: string;
  status: string;
  billingCycle: string;
  amount: number;
  currency: string;
  startDate: string;
  endDate: string;
  autoRenews: boolean;
  active: boolean;
}

export interface AdminUserDetail {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  avatarUrl: string | null;
  status?: string;
  gender?: string;
  country?: string;
  ageGroup?: string;
  lastLoginAt?: string | null;
  emailVerified?: boolean;
  currentPlan?: CurrentPlan;
}

export interface SendMessagePayload {
  email: string;
  title: string;
  message: string;
  attachments?: Array<{
    filename: string;
    contentType: string;
    base64Data: string;
  }>;
}

interface ApiResponse<T> {
  data: T;
  success?: boolean;
  message?: string;
}

interface RawUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  status: string;
  profilePhoto: string;
}

interface RawUserDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  profilePhoto: string;
  status?: string;
  gender?: string;
  country?: string;
  ageGroup?: string;
  lastLoginAt?: string | null;
  emailVerified?: boolean;
  currentPlan?: {
    subscriptionId: number;
    plan: string;
    status: string;
    billingCycle: string;
    amount: number;
    currency: string;
    startDate: string;
    endDate: string;
    autoRenews: boolean;
    active: boolean;
  };
}

// Paginated Users Response
export interface PaginatedUsersResponse {
  content: AdminUser[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// FETCH ALL USERS
export const useAdminUsers = ({
  page = 0,
  size = 10,
  sortBy = "id",
  sortDir = "asc",
  search = "",
}: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
  search?: string;
} = {}) => {
  return useQuery<PaginatedUsersResponse>({
    queryKey: ["admin-users", { page, size, sortBy, sortDir, search }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("size", size.toString());
      params.append("sortBy", sortBy);
      params.append("sortDir", sortDir);
      if (search) {
        params.append("search", search);
      }

      // apiRequest returns the response body: { success, message, data }
      const response = await apiRequest<
        ApiResponse<{
          content: RawUser[];
          totalElements: number;
          totalPages: number;
          size: number;
          page: number;
          first: boolean;
          last: boolean;
        }>
      >(() => api.get(`/admin/users?${params.toString()}`));

      // Extract the users array from response.data
      const users = response?.data?.content ?? [];
      const paginationInfo = response?.data;

      return {
        content: users.map((u: RawUser) => ({
          id: Number(u.id),
          fullName: `${u.firstName} ${u.lastName}`,
          email: u.email,
          joinedDate: u.createdAt,
          status: u.status === "ACTIVE" ? "active" : "deactivated",
          avatarUrl: u.profilePhoto,
        })),
        page: paginationInfo?.page ?? page,
        size: paginationInfo?.size ?? size,
        totalElements: paginationInfo?.totalElements ?? 0,
        totalPages: paginationInfo?.totalPages ?? 0,
        first: paginationInfo?.first ?? true,
        last: paginationInfo?.last ?? true,
      };
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// FETCH USER BY ID
export const useAdminUser = (id: string | number) => {
  return useQuery<AdminUserDetail>({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const response = await apiRequest<ApiResponse<RawUserDetail>>(() =>
        api.get(`/admin/users/${id}`)
      );

      // Extract the user object from response.data
      const u = response?.data;

      if (!u) {
        throw new Error("User not found");
      }

      return {
        id: Number(u.id),
        fullName: `${u.firstName} ${u.lastName}`,
        email: u.email,
        createdAt: u.createdAt,
        avatarUrl: u.profilePhoto,
        status: u.status,
        gender: u.gender,
        country: u.country,
        ageGroup: u.ageGroup,
        lastLoginAt: u.lastLoginAt,
        emailVerified: u.emailVerified,
        currentPlan: u.currentPlan,
      };
    },
    enabled: Boolean(id),
  });
};

// -----------------------------
// DEACTIVATE USER
// -----------------------------
export const useDeactivateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiRequest(() =>
        api.patch(`/admin/users/${userId}/deactivate`)
      );
    },
    onSuccess: () => {
      toast.success("User deactivated successfully");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      qc.invalidateQueries({ queryKey: ["admin-user"] });
    },
    onError: (error: Error | AxiosError) => {
      const errorMessage =
        (error instanceof AxiosError && error.response?.data?.message) ||
        error.message ||
        "Failed to deactivate user";
      toast.error(errorMessage);
    },
  });
};

// -----------------------------
// ACTIVATE USER
// -----------------------------
export const useActivateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiRequest(() =>
        api.patch(`/admin/users/${userId}/activate`)
      );
    },
    onSuccess: () => {
      toast.success("User activated successfully");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      qc.invalidateQueries({ queryKey: ["admin-user"] });
    },
    onError: (error: Error | AxiosError) => {
      const errorMessage =
        (error instanceof AxiosError && error.response?.data?.message) ||
        error.message ||
        "Failed to activate user";
      toast.error(errorMessage);
    },
  });
};

// -----------------------------
// CANCEL SUBSCRIPTION
// -----------------------------
export const useCancelSubscription = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiRequest(() =>
        api.post(`/admin/users/${userId}/subscription/cancel`)
      );
    },
    onSuccess: () => {
      toast.success("Subscription cancelled successfully");
      qc.invalidateQueries({ queryKey: ["admin-user"] });
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error | AxiosError) => {
      const errorMessage =
        (error instanceof AxiosError && error.response?.data?.message) ||
        error.message ||
        "Failed to cancel subscription";
      toast.error(errorMessage);
    },
  });
};

// -----------------------------
// SEND MESSAGE
// -----------------------------
export const useSendMessage = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (payload: SendMessagePayload) => {
      return await apiRequest(() => api.post(`/admin/users/message`, payload));
    },
    onSuccess: () => {
      toast.success("Message sent successfully");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error | AxiosError) => {
      const errorMessage =
        (error instanceof AxiosError && error.response?.data?.message) ||
        error.message ||
        "Failed to send message";
      toast.error(errorMessage);
    },
  });
};
// -----------------------------
// USER ACQUISITION ANALYTICS
// -----------------------------
export const useUserAcquisition = (period: "month" | "year") => {
  return useQuery({
    queryKey: ["user-acquisition", period],
    queryFn: async () => {
      return await apiRequest(() =>
        api.get(`/admin/analytics/user-acquisition?period=${period}`)
      );
    },
  });
};

// -----------------------------
// DELETE USER
// -----------------------------
export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiRequest(() => api.delete(`/admin/users/${userId}`));
    },
    onSuccess: () => {
      toast.success("User deleted successfully");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
    },
    onError: (error: Error | AxiosError) => {
      const errorMessage =
        (error instanceof AxiosError && error.response?.data?.message) ||
        error.message ||
        "Failed to delete user";
      toast.error(errorMessage);
    },
  });
};
// BILLING TYPES
export interface Billing {
  id: number;
  paymentId: string;
  paymentDate: string;
  plan: string;
  amount: number;
  currency: string;
  status: string;
  invoiceUrl: string | null;
}

export interface PaginatedBillingsResponse {
  content: Billing[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// FETCH USER BILLINGS
export const useUserBillings = (
  userId: string | number,
  page: number = 0,
  size: number = 10
) => {
  return useQuery<PaginatedBillingsResponse>({
    queryKey: ["user-billings", userId, page, size],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("size", size.toString());

      const response = await apiRequest<PaginatedBillingsResponse>(
        () => api.get(`/admin/users/${userId}/billings?${params.toString()}`)
      );

      return (
        response || {
          content: [],
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0,
          first: true,
          last: true,
        }
      );
    },
    enabled: Boolean(userId),
  });
};

// Legacy hook for backward compatibility (deprecated - use useUserBillings instead)
export interface SubscriptionHistory {
  subscriptionId: number;
  plan: string;
  status: string;
  billingCycle: string;
  startDate: string | null;
  endDate: string | null;
  cancelledAt: string | null;
  amount: number;
  currency: string;
  limits: any;
  currentUsage: any;
  autoRenews: boolean;
  nextBillingDate: string | null;
  active: boolean;
  cancelled: boolean;
}

export const useSubscriptionHistory = (userId: string | number) => {
  return useQuery<SubscriptionHistory[]>({
    queryKey: ["subscription-history", userId],
    queryFn: async () => {
      const response = await apiRequest<ApiResponse<SubscriptionHistory[]>>(
        () => api.get(`/admin/users/${userId}/subscription/history`)
      );

      return response?.data ?? [];
    },
    enabled: Boolean(userId),
  });
};
