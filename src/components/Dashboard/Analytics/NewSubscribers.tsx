"use client";

import {
  useNewSubscribers,
  useSubscriptionOverview,
} from "@/hook/useAnalytics";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";
import ChartEmptyState from "./ChartEmptyState";

export default function NewSubscribers() {
  const currentYear = new Date().getFullYear().toString();
  const currentMonth = (new Date().getMonth() + 1).toString();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [activeView, setActiveView] = useState<"year" | "month">("year");

  const { data: subscriptionOverview } = useSubscriptionOverview();
  const { data: newSubscribers, isLoading } = useNewSubscribers({
    period: activeView,
    year: selectedYear,
    month: activeView === "month" ? selectedMonth : undefined,
  });

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full rounded-lg" />;
  }
  const hasChartData = (newSubscribers?.dataPoints?.length || 0) > 0;

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-8 h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-gray-600 text-lg font-medium mb-2">
              New Subscribers
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-indigo-900">
                {newSubscribers?.totalNewSubscribers?.toLocaleString() ||
                  subscriptionOverview?.totalSubscribers?.toLocaleString() ||
                  0}
              </span>
              <span className="text-gray-400 text-lg">Subscribers</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveView("month")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === "month"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Month
              </button>
              <button
                onClick={() => setActiveView("year")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === "year"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}
              >
                Year
              </button>
            </div>

            {activeView === "month" && (
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 bg-gray-100 border-none rounded-lg text-gray-700 font-medium cursor-pointer appearance-none pr-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 12px center",
                }}
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month.toString()}>
                    {new Date(2000, month - 1).toLocaleString("default", {
                      month: "long",
                    })}
                  </option>
                ))}
              </select>
            )}

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2 bg-gray-100 border-none rounded-lg text-gray-700 font-medium cursor-pointer appearance-none pr-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option>{currentYear}</option>
              <option>{(parseInt(currentYear) - 1).toString()}</option>
              <option>{(parseInt(currentYear) - 2).toString()}</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[350px]">
          {!hasChartData ? (
            <ChartEmptyState
              title="No subscriber information"
              description="There’s no subscriber activity for this period yet. Try changing Month/Year or check back later."
            />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={newSubscribers?.dataPoints}
                margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
              >
                <defs>
                  <linearGradient
                    id="subscriberGradient"
                    x1="0.4"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="50%" stopColor="#60269E" stopOpacity={1} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="0"
                  stroke="#f0f0f0"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 14 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9ca3af", fontSize: 14 }}
                  tickFormatter={(value) => {
                    if (value >= 1000) return `${value / 1000}k`;
                    return value.toString();
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="url(#subscriberGradient)"
                  radius={[50, 50, 0, 0]}
                  maxBarSize={30}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
