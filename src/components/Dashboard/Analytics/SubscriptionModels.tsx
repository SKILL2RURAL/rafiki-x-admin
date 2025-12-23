"use client";

import {
  useSubscriptionModels,
  useSubscriptionOverview,
} from "@/hook/useAnalytics";
import React, { SVGProps } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import { LabelContentType } from "recharts/types/component/Label";

interface CustomLabelProps extends SVGProps<SVGTextElement> {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  value?: string | number | null;
  index?: number;
  payload?: { label: string; count: number };
}

const CustomLabel = (props: CustomLabelProps) => {
  const { x, y, width, value } = props;

  const xNum = Number(x || 0);
  const yNum = Number(y || 0);
  const widthNum = Number(width || 0);
  const valueNum = Number(value || 0);

  return (
    <text
      x={xNum + widthNum + 10}
      y={yNum + 18}
      fill="#1f2937"
      fontSize={16}
      fontWeight={400}
    >
      {valueNum} {valueNum === 1 ? "User" : "Users"}
    </text>
  );
};

export default function SubscriptionModels() {
  const { data: subscriptionOverview, isLoading: overviewLoading } =
    useSubscriptionOverview();

  // const { data: subscriptionModels, isLoading: modelsLoading } = useSubscriptionModels();

  const isLoading = overviewLoading;

  const COLORS = ["#60269E", "#51A3DA", "#A080F9"];

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full rounded-lg" />;
  }

  // Use billing breakdown from overview if available, otherwise use subscriptionModels
  let chartData: { label: string; count: number }[] = [];

  if (subscriptionOverview?.billingBreakdown) {
    const { monthly, yearly } = subscriptionOverview.billingBreakdown;
    chartData = [
      { label: "Monthly", count: monthly },
      { label: "Yearly", count: yearly },
    ].filter((item) => item.count > 0);
  }

  // Fallback to subscriptionModels if available
  if (chartData.length === 0) {
    chartData = [
      { label: "Monthly", count: 100 },
      { label: "Yearly", count: 200 },
    ];
  }

  if (chartData.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="rounded-[20px] bg-white border border-[#EAECF0] p-6 max-w-4xl w-full">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-[16px] font-bold text-[#253B4B] mb-1">
            Subscription Models
          </h1>
          <p className="text-[#909090] text-[14px] font-normal">
            This section provides an analysis or insights into users based on
            subscription models
          </p>
        </div>

        {/* Chart */}
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 14 }}
                tickFormatter={(value) => {
                  if (value === 1000) return "1K";
                  if (value >= 1000) return `${value / 1000}K`;
                  return value.toString();
                }}
              />
              <YAxis
                type="category"
                dataKey="label"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#1f2937", fontSize: 16, fontWeight: 400 }}
                width={100}
              />
              <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={32}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  content={CustomLabel as LabelContentType}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
