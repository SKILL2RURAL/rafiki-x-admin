"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { AdminUser } from "@/hook/useUser";
import { useUserStats } from "@/hook/useAnalytics";
import { useEffect } from "react";

const UsersMetrics = ({
  data,
  isLoading,
}: {
  data: AdminUser[];
  isLoading: boolean;
}) => {
  const { data: userStats, isLoading: userStatsLoading } = useUserStats();

  if (!userStatsLoading) {
    <div className="grid grid-cols-3 gap-5">
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <Skeleton key={index} className="h-[30px] w-full rounded-[8px]" />
        );
      })}
    </div>;
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Total Users</p>
        <p className="text-[36px] font-bold text-primary">
          {userStats.totalUsers ?? 0}
        </p>
      </div>
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Active Users</p>
        <p className="text-[36px] font-bold text-primary">
          {userStats.activeUsers ?? 0}
        </p>
      </div>
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Deactivated Users</p>
        <p className="text-[36px] font-bold text-primary">
          {userStats.deactivatedUsers ?? 0}
        </p>
      </div>
    </div>
  );
};

export default UsersMetrics;
