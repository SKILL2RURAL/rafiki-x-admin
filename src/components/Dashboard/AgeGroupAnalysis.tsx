"use client";

import { AnalyticsOverview } from "@/hook/useAnalytics";
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
import { Skeleton } from "../ui/skeleton";
import { LabelContentType } from "recharts/types/component/Label";

interface AgeGroupDataEntry {
  count: number;
  label: string;
}

interface CustomLabelProps extends SVGProps<SVGTextElement> {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  height?: string | number;
  value?: string | number | null;
  index?: number;
  parentViewBox?: string;
  viewBox?: string;
  payload?: AgeGroupDataEntry;
  dataKey?: string | number;
  textBreakAll?: boolean;
  zIndex?: number;
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
      fontWeight={400}>
      {valueNum} {valueNum === 1 ? "user" : "users"}
    </text>
  );
};

export default function AgeGroupAnalysis({
  data,
  isLoading,
}: {
  data: AnalyticsOverview["ageGroupDistribution"];
  isLoading: boolean;
}) {
  const COLORS = [
    "#60269E",
    "#51A3DA",
    "#A080F9",
    "#FF8042",
    "#8884d8",
    "#82ca9d",
  ];

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full rounded-lg" />;
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-sm p-12 max-w-4xl w-full">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">Age Group</h1>
          <p className="text-gray-500 text-lg">
            This section provides an analysis or insights into users based on
            age group
          </p>
        </div>

        {/* Chart */}
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}>
              <XAxis
                type="number"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 14 }}
                // ticks={[0, 10, 20, 50, 100, 200, 500, 1000]}
                tickFormatter={(value) => (value === 1000 ? "1K" : value)}
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
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <LabelList
                  dataKey="count"
                  content={CustomLabel as LabelContentType}
                />
                {/* <LabelList dataKey="count" /> */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
