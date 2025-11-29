import React from "react";

interface GenderData {
  [key: string]: number;
}

interface GenderBubbleChartProps {
  data?: GenderData;
}

const GenderBubbleChart = ({
  data = { Male: 70, Female: 30 },
}: GenderBubbleChartProps) => {
  const genderData = Object.entries(data)
    .sort(([, a], [, b]) => b - a)
    .map(([key, value]) => ({
      name: key,
      percentage: Math.round(value),
    }));

  const firstGender = genderData[0];
  const secondGender = genderData[1];

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-gray-800">Users</h2>
        <p className="text-gray-500 mt-1">
          This section provides an analysis or insights into users gender
        </p>
      </div>

      <div className="relative h-96 flex items-center justify-center mt-8">
        {/* First Gender Circle - Larger, behind */}
        {firstGender && (
          <svg
            className="absolute"
            width="400"
            height="400"
            style={{ left: "0%" }}
          >
            <defs>
              <linearGradient
                id="firstGradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#5B9BD5" />
                <stop offset="100%" stopColor="#7B3FF2" />
              </linearGradient>
            </defs>
            <circle
              cx="180"
              cy="200"
              r="140"
              fill="url(#firstGradient)"
              opacity="0.95"
            />
            <text
              x="180"
              y="200"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-6xl font-bold fill-white"
            >
              {firstGender.percentage}%
            </text>
          </svg>
        )}

        {/* Second Gender Circle - Smaller, in front */}
        {secondGender && (
          <svg
            className="absolute"
            width="300"
            height="300"
            style={{ right: "0%" }}
          >
            <defs>
              <linearGradient
                id="secondGradient"
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
              fill="url(#secondGradient)"
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
              {secondGender.percentage}%
            </text>
          </svg>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-8">
        {firstGender && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#5B9BD5] to-[#7B3FF2]"></div>
            <span className="text-gray-500 font-light">{firstGender.name}</span>
          </div>
        )}
        {secondGender && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#4FC3F7] to-[#5B9BD5]"></div>
            <span className="text-gray-500 font-light">
              {secondGender.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenderBubbleChart;
