"use client";

import { useSubscriptionUsers } from "@/hook/useAnalytics";
import BubbleChart from "@/components/Dashboard/GenderBubbleCart";

export default function SubscriptionUsers() {
  const { data: subscriptionUsers, isLoading } = useSubscriptionUsers();

  if (!subscriptionUsers) {
    return null;
  }

  // Transform subscription data to bubble chart format
  const chartData = [
    {
      name: "Free User",
      percentage: subscriptionUsers.freeUsers?.percentage || 0,
    },
    {
      name: "Paid Users",
      percentage: subscriptionUsers.paidUsers?.percentage || 0,
    },
  ];

  return (
    <BubbleChart
      data={chartData}
      isLoading={isLoading}
      title="Users"
      description="This section provides an analysis or insights into drop off rate based on user types"
      gradientId="subscription-users"
    />
  );
}
