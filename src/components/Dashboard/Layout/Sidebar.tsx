"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, MessageCircle, Settings, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const iconSize = "20px"; // Icon Size

  // Navbar Links
  const link = [
    {
      name: "Analytics",
      icon: <MessageCircle size={iconSize} />,
      href: "/analytics",
    },
    {
      name: "Users",
      icon: <Users size={iconSize} />,
      href: "/users",
    },
    {
      name: "Settings",
      icon: <Settings size={iconSize} />,
      href: "/settings",
    },
  ];

  // Function to handle LogOut
  function logout() {
    router.replace("/login");
  }

  return (
    <div className="w-[var(--sidebar-width)] bg-[#FCFCFC] flex flex-col px-5 justify-between">
      <div>
        {/* Logo  */}
        <div className="flex gap-3 items-center h-[var(--navbar-height)]">
          <Image
            src={"/icons/logo-gradient.svg"}
            alt="Rafiki X"
            width={40}
            height={40}
            fetchPriority="high"
          />
          <p className="font-mullish font-bold text-[24px] bg-gradient-to-r from-[#51A3DA] to-[#60269E] bg-clip-text text-transparent">
            RafikiX
          </p>
        </div>

        {/* Navbar Links  */}
        <ul className="mt-10 space-y-[8px]">
          {link.map((item, i) => (
            <Link
              href={item.href}
              key={i}
              className={`${
                pathname.includes(item.href)
                  ? "bg-red-400 from-[#51A3DA] to-[#60269E] rounded-[8px] text-white"
                  : "text-[#808990]"
              }`}
            >
              <li
                className={`flex gap-[11px] items-center px-[10px] h-[40px] text-[16px] ${
                  pathname.includes(item.href)
                    ? "bg-gradient-to-r from-[#51A3DA] to-[#60269E] rounded-[8px] text-white font-bold"
                    : "text-[#808990] font-[400]"
                }`}
              >
                {item.icon}
                <p>{item.name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      {/* Profile and logout  */}
      <div className="flex gap-2 justify-between mb-10 items-center">
        <div className="flex gap-2 items-center">
          <Avatar className="size-10">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-semibold leading-none">Sunrise truck</p>
            <p className="text-sm leading-none">bola@truckie.com</p>
          </div>
        </div>
        <button onClick={logout}>
          <LogOut color="#98A2B3" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
