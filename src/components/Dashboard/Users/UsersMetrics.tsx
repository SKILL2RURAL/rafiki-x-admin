import { Skeleton } from "@/components/ui/skeleton";
import { AdminUser } from "@/hook/useUser";

const UsersMetrics = ({
  data,
  isLoading,
}: {
  data: AdminUser[];
  isLoading: boolean;
}) => {
  if (!isLoading) {
    <div className="grid grid-cols-3 gap-5">
      {Array.from({ length: 3 }).map((_, index) => {
        return (
          <Skeleton key={index} className="h-[30px] w-full rounded-[8px]" />
        );
      })}
    </div>;
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Total Users</p>
        <p className="text-[36px] font-bold text-primary">
          {data?.length ?? 0}
        </p>
      </div>
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Active Users</p>
        <p className="text-[36px] font-bold text-primary">
          {data?.filter((user) => user.status === "active").length ?? 0}
        </p>
      </div>
      <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
        <p className="text-[14px] text-[#A3AED0]">Deactivated Users</p>
        <p className="text-[36px] font-bold text-primary">
          {data?.filter((u) => u.status === "deactivated").length ?? 0}
        </p>
      </div>
    </div>
  );
};

export default UsersMetrics;
