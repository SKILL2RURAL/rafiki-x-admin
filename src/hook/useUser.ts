"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiHandler";
import api from "@/lib/axios";
import { toast } from "sonner";

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

export interface AdminUserDetail {
  id: number;
  fullName: string;
  email: string;
  createdAt: string;
  avatarUrl: string | null;
}

export interface BillingRecord {
  id: number;
  userId: number;
  amount: number;
  status: "paid" | "pending" | "failed";
  createdAt: string;
}

// FETCH ALL USERS
export const useAdminUsers = () => {
  return useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res: any = await apiRequest(() => api.get("/admin/users"));
      
      // The response structure is { success, message, data: [...] }
      const users = res?.data ?? [];

      return users.map((u: any) => ({
        id: u.id,
        fullName: `${u.firstName} ${u.lastName}`,
        email: u.email,
        joinedDate: u.createdAt,
        status: u.status === "ACTIVE" ? "active" : "deactivated",
        avatarUrl: u.profilePhoto,
      }));
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// FETCH USER BY ID
export const useAdminUser = (id: string | number) => {
  return useQuery<AdminUserDetail>({
    queryKey: ["admin-user", id],
    queryFn: async () => {
      const res: any = await apiRequest(() => api.get(`/admin/users/${id}`));
      
      // The response structure is { success, message, data: {...} }
      const u = res?.data;

      return {
        id: u.id,
        fullName: `${u.firstName} ${u.lastName}`,
        email: u.email,
        createdAt: u.createdAt,
        avatarUrl: u.profilePhoto,
      };
    },
    enabled: Boolean(id),
  });
};

// FETCH BILLINGS
export const useBilling = () => {
  return useQuery<BillingRecord[]>({
    queryKey: ["billing"],
    queryFn: async () => {
      const res: any = await apiRequest(() => api.get("/billing"));
      const rows = res?.data ?? [];
      
      return rows.map((b: any) => ({
        id: b.id,
        userId: b.userId,
        amount: b.amount,
        status: b.status,
        createdAt: b.createdAt,
      }));
    },
  });
};

// -----------------------------
// DEACTIVATE USER
// -----------------------------
export const useDeactivateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (userId: number) => {
      return await apiRequest(() => api.patch(`/admin/users/${userId}/deactivate`));
    },
    onSuccess: () => {
      toast.success("User deactivated successfully");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      qc.invalidateQueries({ queryKey: ["admin-user"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to deactivate user";
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
      return await apiRequest(() => api.patch(`/admin/users/${userId}/activate`));
    },
    onSuccess: () => {
      toast.success("User activated successfully");
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      qc.invalidateQueries({ queryKey: ["admin-user"] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to activate user";
      toast.error(errorMessage);
    },
  });
};

// -----------------------------
// SEND MESSAGE
// -----------------------------
export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (payload: { userId: string; message: string }) => {
      return await apiRequest(() => api.post(`/admin/users/message`, payload));
    },
    onSuccess: () => {
      toast.success("Message sent successfully");
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data?.message || "Failed to send message";
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