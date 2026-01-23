"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";
import { useUser } from "@/hook/useAuth";

const Navbar = () => {
  const { data: user } = useUser();
  const userInitials =
    user?.firstName && user?.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : "CN";

  // Format current date
  const getFormattedDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleDateString("en-US", { month: "short" });
    const year = today.getFullYear();

    // Add ordinal suffix to day
    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `Today, ${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
  };

  // Get full name
  const fullName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || "Guest";

  return (
    <div className="h-(--navbar-height) flex items-center justify-between p-5 w-[calc(100vw-var(--sidebar-width))] border-b-[0.64px] border-[#C8CCD0]">
      {/* Name and Profile  */}
      <div className="space-y-[8px]">
        <p className="text-[16px] font-medium">Hello, {fullName} 👋</p>
        <p className="text-[#2B2C34] text-sm">{getFormattedDate()}</p>
      </div>
      <div className="flex gap-2 items-center">
        {/* Notification Icon  */}
        <button>
          <Bell />
        </button>
        <hr className="w-[30px] bg-[#A0A3A6] rotate-90" />

        {/* User Profile Image  */}
        <button>
          <Avatar>
            <AvatarImage src={user?.profilePhoto} />
            <AvatarFallback>{userInitials}</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
