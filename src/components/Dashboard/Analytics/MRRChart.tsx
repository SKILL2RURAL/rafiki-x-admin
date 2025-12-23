"use client";

import { useMRR } from "@/hook/useAnalytics";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function MRRChart() {
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [activeView, setActiveView] = useState<"year" | "month">("year");

  const { data: mrrData, isLoading } = useMRR({
    period: activeView,
    year: selectedYear,
  });

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full rounded-lg" />;
  }

  if (!mrrData || !mrrData.dataPoints || mrrData.dataPoints.length === 0) {
    return null;
  }

  // Transform dataPoints to use 'value' for the chart (recharts expects 'value')
  const chartData = mrrData.dataPoints.map((point) => ({
    label: point.label,
    value: point.amount,
  }));

  const currency = mrrData.currency || "NGN";
  const totalRevenue = mrrData.totalRevenue || 0;

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-8 h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-gray-600 text-lg font-medium mb-2">MRR</h1>
            <p className="text-gray-500 text-sm">
              The average amount customers spend per order
            </p>
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

        {/* Revenue Info */}
        {/* <div className="mb-4 flex gap-6">
          <div>
            <span className="text-gray-500 text-sm">Total Revenue</span>
            <p className="text-2xl font-bold text-gray-900">
              {currency} {totalRevenue.toLocaleString()}
            </p>
          </div>
        </div> */}

        {/* Chart */}
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
            >
              <defs>
                <linearGradient id="mrrGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#60269E" stopOpacity={1} />
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
                  if (value >= 1000000) return `${value / 1000000}M`;
                  if (value >= 1000) return `${value / 1000}K`;
                  return value.toString();
                }}
              />
              <Tooltip
                formatter={(value: number) => {
                  if (value >= 1000000)
                    return `${currency} ${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000)
                    return `${currency} ${(value / 1000).toFixed(1)}K`;
                  return `${currency} ${value.toLocaleString()}`;
                }}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="url(#mrrGradient)"
                strokeWidth={3}
                dot={{ fill: "#60269E", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
