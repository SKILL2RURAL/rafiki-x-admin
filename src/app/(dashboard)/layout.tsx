import Navbar from "@/components/Dashboard/Layout/Navbar";
import Sidebar from "@/components/Dashboard/Layout/Sidebar";
import React from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen w-screen [--sidebar-width:280px] [--navbar-height:78px]">
      <Sidebar />
      <div>
        <Navbar />
        <div className="p-5 pt-10 h-[calc(100vh-var(--navbar-height))] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
