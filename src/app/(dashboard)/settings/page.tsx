'use client'
import Password from "@/components/Setting/Password";
import ProfileForm from "@/components/Setting/Profile";
import TeamPage from "@/components/Setting/Team";
import React, { useState } from "react";

type Tab = 'profile' | 'password' | 'team'

const SettingsPage = () => {
  const [tab, setTab] = useState<Tab>('profile')
  
  const renderComponent = () => {
    switch(tab) {
      case 'profile': return <ProfileForm />;
      case 'password': return <Password />;
      case 'team': return <TeamPage />;
      default: return <ProfileForm/>
    }
  }

  return (
  <div>
    <div className="w-[355px] h-[52px] rounded-[8px] bg-[#F4F4F5] flex items-center justify-between px-4 mb-8 text-black">
      <div className={tab === 'profile' ? 'w-fit h-[36px] rounded-[8px] bg-[#F2F8FC] text-center font-bold p-1 bg-gradient-to-r from-[#51A3DA] to-[#60269E] bg-clip-text text-transparent border border-[#51A3DA] cursor-pointer': 'cursor-pointer'} onClick={() => {setTab('profile')}}>Profile</div>
      <div className={tab === 'password' ? 'w-fit h-[36px] rounded-[8px] bg-[#F2F8FC] text-center font-bold p-1 bg-gradient-to-r from-[#51A3DA] to-[#60269E] bg-clip-text text-transparent border border-[#51A3DA] cursor-pointer': 'cursor-pointer'} onClick={() => {setTab('password')}}>Password</div>
      <div className={tab === 'team' ? 'w-fit h-[36px] rounded-[8px] bg-[#F2F8FC] text-center font-bold p-1 bg-gradient-to-r from-[#51A3DA] to-[#60269E] bg-clip-text text-transparent border border-[#51A3DA] cursor-pointer': 'cursor-pointer'} onClick={() => {setTab('team')}}>Team</div>
    </div>
    <section>
      {renderComponent()}
    </section>
  </div>
  );
};

export default SettingsPage;
