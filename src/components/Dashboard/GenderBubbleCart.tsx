import React from "react";

interface GenderData {
  male: number;
  female: number;
}

interface GenderBubbleChartProps {
  data?: GenderData;
}

const GenderBubbleChart = ({
  data = { male: 70, female: 30 },
}: GenderBubbleChartProps) => {
  // Calculate percentages
  const total = data.male + data.female;
  const malePercentage = total > 0 ? Math.round((data.male / total) * 100) : 0;
  const femalePercentage =
    total > 0 ? Math.round((data.female / total) * 100) : 0;
  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <p className="text-gray-500 mt-1">
          This section provides an analysis or insights into users gender
        </p>
      </div>

      <div className="relative h-96 flex items-center justify-center mt-8">
        {/* Male Circle - Larger, behind */}
        <svg
          className="absolute"
          width="400"
          height="400"
          style={{ left: "10%" }}
        >
          <defs>
            <linearGradient id="maleGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#5B9BD5" />
              <stop offset="100%" stopColor="#7B3FF2" />
            </linearGradient>
          </defs>
          <circle
            cx="180"
            cy="200"
            r="140"
            fill="url(#maleGradient)"
            opacity="0.95"
          />
          <text
            x="180"
            y="200"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-6xl font-bold fill-white"
          >
            {malePercentage}%
          </text>
        </svg>

        {/* Female Circle - Smaller, in front */}
        <svg
          className="absolute"
          width="300"
          height="300"
          style={{ right: "0%" }}
        >
          <defs>
            <linearGradient
              id="femaleGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4FC3F7" />
              <stop offset="100%" stopColor="#5B9BD5" />
            </linearGradient>
          </defs>
          <circle
            cx="150"
            cy="150"
            r="100"
            fill="url(#femaleGradient)"
            opacity="0.95"
            stroke="white"
            strokeWidth="4"
          />
          <text
            x="150"
            y="150"
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-5xl font-bold fill-white"
          >
            {femalePercentage}%
          </text>
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#5B9BD5] to-[#7B3FF2]"></div>
          <span className="text-gray-500 font-light">Male</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#4FC3F7] to-[#5B9BD5]"></div>
          <span className="text-gray-500 font-light">Female</span>
        </div>
      </div>
    </div>
  );
};

export default GenderBubbleChart;
