import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <LoaderCircle className="animate-spin size-[30px] my-5" />
      <p className="text-[20px] font-semibold">Loading...</p>
    </div>
  );
}
