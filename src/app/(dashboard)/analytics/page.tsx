"use client";

import AgeGroupAnalysis from "@/components/Dashboard/AgeGroupAnalysis";
import GenderBubbleChart from "@/components/Dashboard/GenderBubbleCart";
import UserAcquisitions from "@/components/Dashboard/UserAcquisitions";
import WorldMap from "@/components/Dashboard/WorldMap";
import { Spinner } from "@/components/ui/spinner";
import { useAnalyticsOverview } from "@/hook/useAnalytics";
import { useState } from "react";

const AnalyticsPage = () => {
  const [active, setActive] = useState("Users");
  const { data: analyticsOverview, isLoading } = useAnalyticsOverview();

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <div>
      {/* Metrics  */}
      <div className="grid grid-cols-4 gap-5">
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Total Users</p>
          <p className="text-[36px] font-bold text-primary">
            {analyticsOverview?.summary.totalUsers || 0}
          </p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Resume Upload</p>
          <p className="text-[36px] font-bold text-primary">
            {analyticsOverview?.summary.resumeUploads || 0}
          </p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Active Subscriptions</p>
          <p className="text-[36px] font-bold text-primary">
            {analyticsOverview?.summary.activeSubscriptions || 0}
          </p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">New Signups</p>
          <p className="text-[36px] font-bold text-primary">
            {analyticsOverview?.summary.newSignups || 0}
          </p>
        </div>
      </div>

      {/* switch button  */}
      <div className="flex gap-5 mt-10 bg-[#F4F4F5] rounded-[8px] px-3 py-2 w-fit">
        {["Users", "Subscriptions"].map((item, index) => (
          <button
            key={index}
            className={`${
              active === item && "border border-[#51A3DA] bg-[#F2F8FC]"
            } px-5 py-1 rounded-[4px] `}
            onClick={() => setActive(item)}
          >
            <p
              className={` ${
                active === item
                  ? "bg-gradient-to-r from-[#51A3DA] to-[#60269E] text-transparent bg-clip-text font-bold"
                  : "text-[#4D5154] text-[14px]"
              }`}
            >
              {item}
            </p>
          </button>
        ))}
      </div>
      <div className="h-10" />

      {/* USER ACQUISITION  */}
      <UserAcquisitions />
      <div className="grid grid-cols-2 gap-5 mt-10">
        {/* Users  */}
        <GenderBubbleChart data={analyticsOverview?.genderDistribution} />
        {/* Age Group  */}
        <AgeGroupAnalysis />
      </div>

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
              {analyticsOverview?.activeUsers.total || 0}
            </p>

            <div>
              <p className="text-[#2B3674] text-sm font-semibold mb-5">
                Top Location
              </p>
              <div className="space-y-[4px]">
                {analyticsOverview &&
                  analyticsOverview.activeUsers.topLocations.map(
                    (item, index) => (
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
                    )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
