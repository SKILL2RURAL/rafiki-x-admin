import React from "react";
import { Skeleton } from "../ui/skeleton";
import ChartEmptyState from "./Analytics/ChartEmptyState";

interface BubbleChartDataItem {
  name: string;
  percentage: number;
}

interface BubbleChartProps {
  data?: BubbleChartDataItem[] | Record<string, number>;
  isLoading: boolean;
  title?: string;
  description?: string;
  gradientId?: string;
}

const BubbleChart = ({
  data,
  isLoading,
  title = "Users",
  description = "This section provides an analysis or insights",
  gradientId = "bubble",
}: BubbleChartProps) => {
  // Normalize data format - handle both array and object formats
  let chartData: BubbleChartDataItem[] = [];

  if (Array.isArray(data)) {
    chartData = data
      .map((item) => ({
        name: item.name,
        percentage: Math.round(item.percentage),
      }))
      .sort((a, b) => b.percentage - a.percentage);
  } else if (data && typeof data === "object" && !Array.isArray(data)) {
    chartData = Object.entries(data)
      .sort(([, a], [, b]) => {
        const valA =
          typeof a === "number"
            ? a
            : (a as { percentage?: number })?.percentage || 0;
        const valB =
          typeof b === "number"
            ? b
            : (b as { percentage?: number })?.percentage || 0;
        return valB - valA;
      })
      .map(([key, value]) => ({
        name: key,
        percentage: Math.round(
          typeof value === "number"
            ? value
            : (value as { percentage?: number })?.percentage || 0
        ),
      }));
  }

  const firstItem = chartData[0];
  const secondItem = chartData[1];

  if (isLoading) {
    return <Skeleton className="h-[600px] w-full rounded-lg" />;
  }

  if (!firstItem) {
    return (
      <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm">
        <div className="mb-2">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <p className="text-gray-500 mt-1">{description}</p>
        </div>

        <div className="h-96 mt-8">
          <ChartEmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-8 bg-white rounded-2xl shadow-sm">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>

      <div className="relative h-96 flex items-center justify-center mt-8">
        {/* First Item Circle - Larger, behind */}
        {firstItem && (
          <svg
            className="absolute"
            width="400"
            height="400"
            style={{ left: "0%" }}
          >
            <defs>
              <linearGradient
                id={`firstGradient-${gradientId}`}
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
              fill={`url(#firstGradient-${gradientId})`}
              opacity="0.95"
            />
            <text
              x="180"
              y="200"
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-6xl font-bold fill-white"
            >
              {firstItem.percentage}%
            </text>
          </svg>
        )}

        {/* Second Item Circle - Smaller, in front */}
        {secondItem && (
          <svg
            className="absolute"
            width="300"
            height="300"
            style={{ right: "0%" }}
          >
            <defs>
              <linearGradient
                id={`secondGradient-${gradientId}`}
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
              fill={`url(#secondGradient-${gradientId})`}
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
              {secondItem.percentage}%
            </text>
          </svg>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 mt-8">
        {firstItem && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-linear-to-b from-[#5B9BD5] to-[#7B3FF2]"></div>
            <span className="text-gray-500 font-light">{firstItem.name}</span>
          </div>
        )}
        {secondItem && (
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-linear-to-b from-[#4FC3F7] to-[#5B9BD5]"></div>
            <span className="text-gray-500 font-light">{secondItem.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default BubbleChart;

// Export with original name for backward compatibility
export const GenderBubbleChart = BubbleChart;
