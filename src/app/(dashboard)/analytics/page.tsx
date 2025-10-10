"use client";

import React from "react";

const AnalyticsPage = () => {
  const [active, setActive] = React.useState("Users");

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

      <div className="flex gap-5 mt-10">
        {["Users", "Subcription"].map((item, index) => (
          <button key={index}>
            <p
              className={` ${
                active === item
                  ? "bg-gradient-to-r from-[#51A3DA] to-[#60269E] text-transparent bg-clip-text"
                  : "text-[#4D5154]"
              }`}
            >
              {item}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnalyticsPage;
