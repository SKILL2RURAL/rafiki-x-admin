import { useQuery } from "@tanstack/react-query";

export const useAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await fetch("/api/teams/admins", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch admins");
      }
      return res.json();
    },
  });
};
