import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const data = [
  { month: "Jan", signups: 800 },
  { month: "Feb", signups: 11000 },
  { month: "Mar", signups: 1200 },
  { month: "Apr", signups: 5500 },
  { month: "May", signups: 10000 },
  { month: "Jun", signups: 1400 },
  { month: "Jul", signups: 5300 },
  { month: "Aug", signups: 600 },
  { month: "Sep", signups: 5500 },
  { month: "Oct", signups: 9000 },
  { month: "Nov", signups: 1600 },
  { month: "Dec", signups: 5500 },
];

export default function UserAcquisitions() {
  const [selectedYear, setSelectedYear] = useState("2025");
  const [activeView, setActiveView] = useState("Month");

  const totalSignups = data.reduce((sum, item) => sum + item.signups, 0);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-sm p-8 h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-gray-600 text-lg font-medium mb-2">
              User Acquisitions
            </h1>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-bold text-indigo-900">
                {totalSignups.toLocaleString()}
              </span>
              <span className="text-gray-400 text-lg">Sign Ups</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveView("Month")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === "Month"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}>
                Month
              </button>
              <button
                onClick={() => setActiveView("Year")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeView === "Year"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500"
                }`}>
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
              }}>
              <option>2025</option>
              <option>2024</option>
              <option>2023</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="barGradient" x1="0.4" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                  <stop offset="50%" stopColor="#60269E" stopOpacity={1} />
                  {/* <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} /> */}
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="0"
                stroke="#f0f0f0"
                vertical={false}
              />
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 14 }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 14 }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Bar
                dataKey="signups"
                fill="url(#barGradient)"
                radius={[50, 50, 0, 0]}
                maxBarSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
