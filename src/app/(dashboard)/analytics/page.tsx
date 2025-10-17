"use client";

import AgeGroupAnalysis from "@/components/Dashboard/AgeGroupAnalysis";
import GenderBubbleChart from "@/components/Dashboard/GenderBubbleCart";
import GenderBubbleCart from "@/components/Dashboard/GenderBubbleCart";
import UserAcquisitions from "@/components/Dashboard/UserAcquisitions";
import WorldMap from "@/components/Dashboard/WorldMap";
import React from "react";
import {
  BarChart,
  Legend,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid,
  Bar,
  ResponsiveContainer,
} from "recharts";

const AnalyticsPage = () => {
  const [active, setActive] = React.useState("Users");

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
    },
  ];

  const locations = [
    { name: "Lagos, Nigeria", percent: 50 },
    { name: "USA", percent: 30 },
    { name: "England", percent: 20 },
    { name: "Ghana", percent: 10 },
    { name: "Germany", percent: 10 },
  ];

  return (
    <div>
      {/* Metrics  */}
      <div className="grid grid-cols-4 gap-5">
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Total Users</p>
          <p className="text-[36px] font-bold text-primary">0</p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Resume Upload</p>
          <p className="text-[36px] font-bold text-primary">0</p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Active Subscriptions</p>
          <p className="text-[36px] font-bold text-primary">0</p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">New Signups</p>
          <p className="text-[36px] font-bold text-primary">0</p>
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

      <UserAcquisitions />

      <div className="grid grid-cols-2 gap-5 mt-10">
        {/* Users  */}
        <GenderBubbleChart data={{ male: 320, female: 180 }} />

        {/* Age Group  */}
        <AgeGroupAnalysis />
      </div>

      <div className="border border-[#EAECF0] rounded-[20px] p-5 mt-10">
        <div className="border-b pb-5 flex items-center justify-between">
          <p className="text-[16px] font-[500]">Active Users</p>
          <button className="px-3 py-2 border border-[#D0D5DD] shadow-sm rounded-[8px]">
            Real-time report
          </button>
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
              15.3k
            </p>

            <div>
              <p className="text-[#2B3674] text-sm font-semibold mb-5">
                Top Location
              </p>
              <div className="space-y-[4px]">
                {locations.map((item, index) => (
                  <div key={index}>
                    <p className="text-[12px] font-[500] mb-2">{item.name}</p>
                    <div className="flex gap-3">
                      <div className="w-full bg-[#2390FA0D] rounded-[3px] min-h-[6px]">
                        <div
                          className="bg-[#2390FA] h-full rounded-[3px]"
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-[#344054]">
                        {item.percent}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
