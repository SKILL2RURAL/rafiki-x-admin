import { useAnalyticsOverview } from "@/hook/useAnalytics";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { ageGroup: "12-15 years", users: 505, color: "#7c3aed" },
  { ageGroup: "16-21 years", users: 100, color: "#3b82f6" },
  { ageGroup: "22-26 years", users: 100, color: "#a78bfa" },
  { ageGroup: "27-35 years", users: 50, color: "#06b6d4" },
  { ageGroup: "36 above", users: 14, color: "#16a34a" },
];

interface CustomLabelProps {
  x?: string | number;
  y?: string | number;
  width?: string | number;
  value?: string | number;
}

const CustomLabel = (props: CustomLabelProps) => {
  const { x = 0, y = 0, width = 0, value = 0 } = props;
  const xNum = typeof x === "string" ? parseFloat(x) : x;
  const yNum = typeof y === "string" ? parseFloat(y) : y;
  const widthNum = typeof width === "string" ? parseFloat(width) : width;

  return (
    <text
      x={xNum + widthNum + 10}
      y={yNum + 18}
      fill="#1f2937"
      fontSize={16}
      fontWeight={400}
    >
      {value} {value === 1 ? "user" : "users"}
    </text>
  );
};

export default function AgeGroupAnalysis() {
  const { data, isLoading } = useAnalyticsOverview();
  const ageGroups = data?.ageGroupDistribution || [];

  if (isLoading) {
    return <div>Loading data</div>;
  }

  if (!ageGroups.length) {
    return null;
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
              data={ageGroups}
              layout="vertical"
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
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
                {ageGroups.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill="blue" />
                ))}
                <LabelList dataKey="count" content={CustomLabel as any} />
                {/* <LabelList dataKey="count" /> */}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
