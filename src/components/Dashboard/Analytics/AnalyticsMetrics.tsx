import { Skeleton } from "@/components/ui/skeleton";
import { AnalyticsOverview } from "@/hook/useAnalytics";

const AnalyticsMetrics = ({
  data,
  isLoading,
}: {
  data: AnalyticsOverview | undefined;
  isLoading: boolean;
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-[150px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Total Users</p>
        <p className="text-[36px] font-bold text-primary">
          {data?.summary.totalUsers || 0}
        </p>
      </div>
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Resume Upload</p>
        <p className="text-[36px] font-bold text-primary">
          {data?.summary.resumeUploads || 0}
        </p>
      </div>
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Active Subscriptions</p>
        <p className="text-[36px] font-bold text-primary">
          {data?.summary.activeSubscriptions || 0}
        </p>
      </div>
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">New Signups</p>
        <p className="text-[36px] font-bold text-primary">
          {data?.summary.newSignups || 0}
        </p>
      </div>
    </div>
  );
};

export default AnalyticsMetrics;
