"use client";

import AnalyticsMetrics from "@/components/Dashboard/Analytics/AnalyticsMetrics";
import GenderBubbleChart from "@/components/Dashboard/GenderBubbleCart";
import {
  useAnalyticsOverview,
  useSubscriptionOverview,
} from "@/hook/useAnalytics";
import dynamic from "next/dynamic";
import { useState } from "react";

// User Analytics components
const ActiveUsers = dynamic(
  () => import("@/components/Dashboard/Analytics/ActiveUsers")
);
const AgeGroupAnalysis = dynamic(
  () => import("@/components/Dashboard/AgeGroupAnalysis")
);

const UserAcquisitions = dynamic(
  () => import("@/components/Dashboard/UserAcquisitions")
);

// Subscription Analytics components
const NewSubscribers = dynamic(
  () => import("@/components/Dashboard/Analytics/NewSubscribers")
);
const SubscriptionUsers = dynamic(
  () => import("@/components/Dashboard/Analytics/SubscriptionUsers")
);
const SubscriptionModels = dynamic(
  () => import("@/components/Dashboard/Analytics/SubscriptionModels")
);
const MRRChart = dynamic(
  () => import("@/components/Dashboard/Analytics/MRRChart")
);

const AnalyticsPage = () => {
  const [active, setActive] = useState("Users");
  const { data: analyticsOverview, isLoading } = useAnalyticsOverview();
  const { data: subscriptionOverview } = useSubscriptionOverview();

  console.log("Analytics Overview:", analyticsOverview);

  return (
    <div>
      {/* Metrics  */}
      <AnalyticsMetrics
        data={analyticsOverview}
        subscriptionData={subscriptionOverview}
        isLoading={isLoading}
      />

      {/* switch button  */}
      <div className="flex gap-5 mt-10 bg-[#F4F4F5] rounded-xl px-3 py-2 w-fit">
        {["Users", "Subscriptions"].map((item, index) => (
          <button
            key={index}
            className={`${
              active === item && "border border-[#51A3DA] bg-[#F2F8FC]"
            } px-5 py-1 rounded-lg `}
            onClick={() => setActive(item)}
          >
            <p
              className={` ${
                active === item
                  ? "bg-linear-to-r from-[#51A3DA] to-[#60269E] text-transparent bg-clip-text font-bold"
                  : "text-[#4D5154] text-[14px]"
              }`}
            >
              {item}
            </p>
          </button>
        ))}
      </div>
      <div className="h-10" />

      {active === "Users" ? (
        <>
          {/* USER ACQUISITION  */}
          <UserAcquisitions />
          <div className="grid grid-cols-2 gap-5 mt-10">
            {/* Users  */}
            <GenderBubbleChart
              data={analyticsOverview?.genderDistribution}
              isLoading={isLoading}
            />
            {/* Age Group  */}
            <AgeGroupAnalysis
              data={analyticsOverview?.ageGroupDistribution || []}
              isLoading={isLoading}
            />
          </div>

          <ActiveUsers
            data={analyticsOverview?.activeUsers}
            isLoading={isLoading}
          />
        </>
      ) : (
        <>
          {/* NEW SUBSCRIBERS  */}
          <NewSubscribers />

          <div className="grid grid-cols-2 gap-5 mt-10 items-start">
            {/* Subscription Users (Donut Chart)  */}
            <SubscriptionUsers />
            {/* Subscription Models (Horizontal Bar Chart)  */}
            <SubscriptionModels />
          </div>

          {/* MRR Chart  */}
          <div className="mt-10">
            <MRRChart />
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsPage;
