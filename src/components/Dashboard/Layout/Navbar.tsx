import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

const Navbar = () => {
  return (
    <div className="h-[var(--navbar-height)] flex items-center justify-between p-5 w-[calc(100vw-var(--sidebar-width))] border-b-[0.64px] border-[#C8CCD0]">
      {/* Name and Profile  */}
      <div className="space-y-[8px]">
        <p className="text-[16px] font-medium">Hello, John Doe ⛅</p>
        <p className="text-[#2B2C34] text-sm">Today, 2nd July, 2025</p>
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
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
