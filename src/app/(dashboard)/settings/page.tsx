"use client";
import Password from "@/components/Setting/Password";
import ProfileForm from "@/components/Setting/Profile";
import TeamPage from "@/components/Setting/Team";
import { useState } from "react";

type Tab = "profile" | "password" | "team";

const SettingsPage = () => {
  const [tab, setTab] = useState<Tab>("profile");

  const renderComponent = () => {
    switch (tab) {
      case "profile":
        return <ProfileForm />;
      case "password":
        return <Password />;
      case "team":
        return <TeamPage />;
      default:
        return <ProfileForm />;
    }
  };

  return (
    <div>
      <div className="w-[355px] h-[52px] rounded-[8px] bg-[#F4F4F5] flex items-center justify-between gap-5 px-4 mb-8">
        {/* Tabs  */}
        {["profile", "password", "team"].map((tabItem) => (
          <div
            key={tabItem}
            style={{
              padding: "0 10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className={
              tab === tabItem
                ? "w-full h-[36px] rounded-[8px] bg-[#F2F8FC] text-center font-bold  bg-linear-to-r from-[#51A3DA] to-[#60269E] bg-clip-text text-transparent border border-[#51A3DA] cursor-pointer"
                : "cursor-pointer"
            }
            onClick={() => {
              setTab(tabItem as Tab);
            }}
          >
            {tabItem.charAt(0).toUpperCase() + tabItem.slice(1)}
          </div>
        ))}
      </div>
      <section>{renderComponent()}</section>
    </div>
  );
};

export default SettingsPage;
