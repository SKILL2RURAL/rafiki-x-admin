"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// -----------------------------
// TYPES
// -----------------------------
export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  joinedDate: string;
  status: "active" | "deactivated";
  avatarUrl?: string;
}

export interface BillingItem {
  id: string;
  paymentDate: string;
  plan: string;
  amount: number;
  status: string;
}

// -----------------------------
// FETCH ALL USERS
// -----------------------------
export const useAdminUsers = () => {
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const res = await fetch("/api/admin/users");

      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();

      return data.data as AdminUser[];
    },
  });
};

// -----------------------------
// FETCH USER BY ID
// -----------------------------
export const useAdminUserById = (userId: string) => {
  return useQuery({
    queryKey: ["admin-user", userId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${userId}`);

      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();

      return data.data as AdminUser;
    },
    enabled: !!userId,
  });
};

// -----------------------------
// FETCH BILLINGS BY USER
// -----------------------------
export const useUserBillings = (userId: string) => {
  return useQuery({
    queryKey: ["user-billings", userId],
    queryFn: async () => {
      const res = await fetch(`/api/admin/users/${userId}/billings`);

      if (!res.ok) throw new Error("Failed to fetch billings");
      const data = await res.json();

      return data.data as BillingItem[];
    },
    enabled: !!userId,
  });
};

// -----------------------------
// DEACTIVATE USER
// -----------------------------
export const useDeactivateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await fetch(`/api/admin/users/${userId}/deactivate`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to deactivate user");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      qc.invalidateQueries({ queryKey: ["admin-user"] });
    },
  });
};

// -----------------------------
// ACTIVATE USER
// -----------------------------
export const useActivateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (userId: string) => {
      const res = await fetch(`/api/admin/users/${userId}/activate`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Failed to activate user");
      return res.json();
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-users"] });
      qc.invalidateQueries({ queryKey: ["admin-user"] });
    },
  });
};

// -----------------------------
// SEND MESSAGE
// -----------------------------
export const useSendMessage = () => {
  return useMutation({
    mutationFn: async (payload: { userId: string; message: string }) => {
      const res = await fetch(`/api/admin/users/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to send message");
      return res.json();
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
      const res = await fetch(
        `/api/admin/analytics/user-acquisition?period=${period}`
      );

      if (!res.ok) throw new Error("Failed to fetch analytics");
      const data = await res.json();

      return data.data;
    },
  });
};
