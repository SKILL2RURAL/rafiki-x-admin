import React from "react";

type ChartEmptyStateProps = {
  title?: string;
  description?: string;
  className?: string;
};

export default function ChartEmptyState({
  title = "No information yet",
  description = "There’s no data available to display here right now. Try changing the filters or check back later.",
  className = "",
}: ChartEmptyStateProps) {
  return (
    <div
      className={`h-full w-full rounded-lg border border-dashed border-gray-200 bg-gray-50/40 flex items-center justify-center text-center px-6 ${className}`}
    >
      <div>
        <p className="text-[15px] font-semibold text-gray-700">{title}</p>
        <p className="mt-1 text-[13px] text-gray-500">{description}</p>
      </div>
    </div>
  );
}

