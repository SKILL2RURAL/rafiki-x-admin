import { AnalyticsOverview } from "@/hook/useAnalytics";
import React from "react";
import WorldMap from "../WorldMap";
import { Skeleton } from "@/components/ui/skeleton";

const ActiveUsers = ({
  data,
  isLoading,
}: {
  data: AnalyticsOverview["activeUsers"];
  isLoading: boolean;
}) => {
  if (isLoading) {
    return <Skeleton className="h-[600px] w-full rounded-[20px] mt-10" />;
  }

  return (
    <div className="border border-[#EAECF0] rounded-[20px] p-5 mt-10">
      <div className="border-b pb-5 flex items-center justify-between">
        <p className="text-[16px] font-medium">Active Users</p>
        <div className="px-3 py-2 border border-[#D0D5DD] shadow-sm rounded-[8px]">
          Real-time report
        </div>
      </div>

      <div className="grid grid-cols-10 my-5">
        {/* Active Users by location on map  */}
        <div className="col-span-6 px-8">
          <WorldMap />
        </div>

        {/* Active users bar chart */}
        <div className="col-span-4 border-l px-8">
          <p className="text-sm text-[#A3AED0]">Active Users </p>
          <p className="text-[27px] text-[#101828] font-semibold mb-7">
            {data?.total || 0}
          </p>

          <div>
            <p className="text-[#2B3674] text-sm font-semibold mb-5">
              Top Location
            </p>
            <div className="space-y-[4px]">
              {data &&
                data?.topLocations.map((item, index) => (
                  <div key={index}>
                    <p className="text-[13px] font-medium mb-2">
                      {item.country}
                    </p>
                    <div className="flex gap-3">
                      <div className="w-full bg-[#2390FA0D] rounded-[3px] min-h-[6px]">
                        <div
                          className="bg-[#2390FA] h-full rounded-[3px]"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <p className="text-[14px] text-[#344054]">
                        {item.percentage.toLocaleString()}%
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveUsers;
