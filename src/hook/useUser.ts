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
  status?: string;
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

// FETCH ALL USERS
export const useAdminUsers = () => {
  return useQuery<AdminUser[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      // apiRequest returns the response body: { success, message, data }
      const response = await apiRequest(() => api.get("/admin/users"));

      // Extract the users array from response.data
      const users = response?.data ?? [];

      interface User {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        createdAt: string;
        status: string;
        profilePhoto: string;
      }

      return users.map((u: User) => ({
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
      const response = await apiRequest(() => api.get(`/admin/users/${id}`));

      // Extract the user object from response.data
      const u = response?.data;

      if (!u) {
        throw new Error("User not found");
      }

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
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to deactivate user";
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
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to activate user";
      toast.error(errorMessage);
    },
  });
};

// -----------------------------
// SEND MESSAGE
// -----------------------------
export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (payload: SendMessagePayload) => {
      return await apiRequest(() => api.post(`/admin/users/message`, payload));
    },
    onSuccess: () => {
      toast.success("Message sent successfully");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message || "Failed to send message";
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
