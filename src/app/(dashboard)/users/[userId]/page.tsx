"use client";

import { ArrowLeft, Download, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageUserModal from "@/components/Dashboard/MessageUserModal";
import { useParams } from "next/navigation";

import { useAdminUser, useActivateUser, useDeactivateUser } from "@/hook/useUser";


const UserDetailsPage = () => {
  const { userId }: any = useParams();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const { data: user, isLoading, isError } = useAdminUser(userId);
  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();

  // Dummy billing table since backend has no billing endpoints
  const tableData = [
    {
      id: "01",
      name: "Design Thinking",
      amount: "1",
      plan: "PREMIUM",
      paymentDate: "Sept 10, 2023",
      status: "completed",
    },
    {
      id: "02",
      name: "Servant Leadership",
      amount: "2",
      plan: "PREMIUM",
      paymentDate: "Sept 10, 2023",
      status: "completed",
    },
  ];

  // Loading State
  if (isLoading) {
    return <p className="text-center py-10">Loading user details...</p>;
  }

  // Error State
  if (isError || !user) {
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load user details.
      </p>
    );
  }

  const handleStatusToggle = () => {
    if (user.status === "active") {
      deactivateUser.mutate(user.id);
    } else {
      activateUser.mutate(user.id);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/admin/users"} className="text-sm flex gap-2 items-center">
            <ArrowLeft />
            Back
          </Link>

          <div className="h-4" />
          <h3 className="font-bold text-[18px]">{user.fullName}</h3>
        </div>

        <button
          className="text-white bg-gradient-to-r from-[#51A3DA] to-[#60269E] rounded-[4px] py-3 px-4 flex items-center gap-3 font-[500]"
          onClick={() => setIsMessageModalOpen(true)}
        >
          Message User
          <MessageSquareMore />
        </button>
      </div>

      <div className="h-5" />

      <div className="grid grid-cols-2 gap-10">
        {/* USER INFORMATION */}
        <div className="space-y-2">
          <h4 className="text-[18px] font-[600]">User Information</h4>

          <div className="shadow-md shadow-[#7090B01A] p-5 rounded-[4px]">
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center gap-3">
                <Avatar className="size-12 border-[1.5px] border-[#51A3DA]">
                  <AvatarImage src={user.avatarUrl || ""} />
                  <AvatarFallback>
                    {user.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-[16px] font-[600]">{user.fullName}</p>
                  <p className="font-[500] text-sm text-[#909090]">
                    Joined: {new Date(user.createdAt).toDateString()}
                  </p>
                </div>
              </div>

              <button
                className={`px-7 py-2 rounded-[4px] text-white ${
                  user.status === "active" ? "bg-[#027A48]" : "bg-red-500"
                }`}
                onClick={handleStatusToggle}
              >
                {user.status === "active" ? "Active" : "Deactivated"}
              </button>
            </div>

            <div className="h-5" />

            <div className="space-y-5">
              <InfoRow label="User ID" value={user.id} />
              <InfoRow label="Email Address" value={user.email} />
              <InfoRow label="Gender" value={"Not provided"} />
              <InfoRow label="Country" value={"Not provided"} />
              <InfoRow
                label="Last Login"
                value={"Not available (backend missing)"}
              />
            </div>
          </div>
        </div>

        {/* CURRENT PLAN (Dummy placeholder since backend doesn't provide) */}
        <div className="space-y-2">
          <h4 className="text-[18px] font-[600]">Current Plan</h4>

          <div className="shadow-md shadow-[#7090B01A] p-5 rounded-[4px]">
            <div className="font-[600]">
              <h3 className="text-[16px]">Basic Plan (Dummy)</h3>
              <p className="text-[32px]">$400.00</p>
            </div>

            <form className="space-y-5">
              <InputDisplay label="Start Date" value="October 10, 2025" />
              <InputDisplay label="End Date" value="November 10, 2025" />

              <button
                type="button"
                className="font-bold text-[14px] bg-gradient-to-r from-[#51A3DA] to-[#60269E] py-3 px-4 rounded-[10px] text-white w-full"
              >
                Cancel Subscription
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="h-5" />

      {/* BILLING TABLE (Dummy) */}
      <div className="flex items-center justify-between">
        <p className="font-[600] text-[20px]">Billings</p>

        <button className="px-5 py-3 bg-[#60269E] text-sm text-white rounded-[4px] flex items-center gap-3">
          Export CSV
          <Download size={18} />
        </button>
      </div>

      <div className="h-5" />

      <div className="border border-[#EAECF0] rounded-[8px] mb-10">
        <Table>
          <TableHeader className="bg-[#F9FAFB] border-b border-[#EAECF0]">
            <TableRow className="h-[45px]">
              <TableHead>S/N</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableData.map((item) => (
              <TableRow key={item.id} className="h-[70px] text-[14px]">
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.paymentDate}</TableCell>
                <TableCell>{item.plan}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  <p className="bg-[#ECFDF3] text-[#027A48] rounded-[16px] px-3 py-1 w-fit">
                    {item.status}
                  </p>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* MESSAGE MODAL */}
      <MessageUserModal
        userId={userId}
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </div>
  );
};

// Helper Row Component
const InfoRow = ({ label, value }: any) => (
  <div className="flex items-center gap-10">
    <div className="grid grid-cols-2 w-full">
      <p className="text-[#253B4B] text-[16px]">{label}:</p>
      <p className="text-[16px] font-[600] text-[#253B4B]">{value}</p>
    </div>
    <button className="rounded-full">
      <Image src={"/icons/copy-icon.svg"} alt="" width={25} height={25} />
    </button>
  </div>
);

const InputDisplay = ({ label, value }: any) => (
  <div className="grid space-y-2">
    <label className="text-[#222222] text-[14px] font-[600]">{label}</label>
    <input className="bg-[#F9F9F9] py-3 px-2" value={value} readOnly />
  </div>
);

export default UserDetailsPage;
