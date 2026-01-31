import { useQuery } from "@tanstack/react-query";

interface Admin {
  createdAt: string;
  email: string;
  firstName: string;
  id: number;
  lastName: string;
  profilePhoto: string | null;
  updatedAt: string;
}

export const useAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await fetch("/api/team/admins?sortDir=desc");

      if (!res.ok) {
        throw new Error("Failed to fetch admins");
      }
      return res.json() as Promise<{
        content: Admin[];
        totalElements: number;
        totalPages: number;
        size: number;
        page: number;
        first: boolean;
        last: boolean;
      }>;
    },
  });
};

interface UserAcquisition {
  dataPoints: { label: string; count: number }[];
  month: string | null;
  period: "month" | "year";
  totalSignUps: number;
  year: string;
}

export const useGetUserAquisitions = ({
  period,
  year,
  month,
}: {
  period?: "year" | "month";
  year?: string;
  month?: string;
}) => {
  return useQuery({
    queryKey: ["user-acquisitions", { period, year, month }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (period) params.append("period", period);
      if (year) params.append("year", year);
      if (month) params.append("month", month);

      const res = await fetch(
        `/api/analytics/user-acquisitions?` + params.toString()
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to fetch user acquisitions"
        );
      }
      return res.json() as Promise<UserAcquisition>;
    },
  });
};
