import { apiRequest } from "@/lib/apiHandler";
import api from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: { email: string; password: string }) => {
      return apiRequest(() => api.post("/admin/login", payload));
    },

    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
  });
};

// INVITE ADMIN
export const useInviteAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: {
      email: string;
      firstName: string;
      lastName: string;
    }) => {
      // return apiRequest(() => api.post("/team/invite", payload));
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to invite admin");
      }
      return data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
  });
};

export interface User {
  id: string;
  // name: string;
  email: string;
  firstName: string;
  lastName: string;
  profilePhoto?: string;
  // role: string;
}

// GET CURRENT LOGGED IN USER (for AuthWrapper, uses cookie)
export const useUser = () => {
  return useQuery<User>({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await fetch("/api/auth/me");

      if (!res.ok) {
        throw new Error("Not authenticated");
      }
      return res.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: false, // Don't retry on auth errors
  });
};

// GET CURRENT ADMIN PROFILE
export const useUserProfile = () => {
  return useQuery<User>({
    queryKey: ["user-profile"],
    queryFn: () => {
      return apiRequest(() => api.get("/admin/profile"));
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

// CHANGE PASSWORD
export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (payload: {
      currentPassword: string;
      newPassword: string;
      confirmNewPassword: string;
    }) => {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      return res.json();
    },
  });
};
