"use client";

import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/apiHandler";
import api from "@/lib/axios";

// -----------------------------
// TYPES
// -----------------------------
export interface Review {
  id: number;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewsResponse {
  content: Review[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

// -----------------------------
// FETCH REVIEWS
// -----------------------------
export const useReviews = ({
  page = 0,
  size = 10,
  sortBy = "createdAt",
  sortDir = "desc",
}: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}) => {
  return useQuery<ReviewsResponse>({
    queryKey: ["reviews", { page, size, sortBy, sortDir }],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", page.toString());
      params.append("size", size.toString());
      params.append("sortBy", sortBy);
      params.append("sortDir", sortDir);

      const result = await apiRequest<ReviewsResponse>(() =>
        api.get(`/admin/reviews?${params.toString()}`)
      );

      return (
        result || {
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
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
