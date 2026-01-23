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
import { toast } from "sonner";

import {
  useAdminUser,
  useActivateUser,
  useDeactivateUser,
  AdminUserDetail,
  useUserBillings,
  useCancelSubscription,
} from "@/hook/useUser";

const UserDetailsPage = () => {
  const { userId }: { userId: string } = useParams();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const ITEMS_PER_PAGE = 10;

  const {
    data: user,
    isLoading,
    isError,
  } = useAdminUser(userId) as {
    data: AdminUserDetail | undefined;
    isLoading: boolean;
    isError: boolean;
  };
  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();
  const cancelSubscription = useCancelSubscription();
  const { data: billingsData, isLoading: isBillingsLoading } = useUserBillings(
    userId,
    currentPage,
    ITEMS_PER_PAGE
  );

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
    if (user.status === "ACTIVE") {
      deactivateUser.mutate(user.id);
    } else {
      activateUser.mutate(user.id);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (billingsData && !billingsData.last) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Link href={"/users"} className="text-sm flex gap-2 items-center">
            <ArrowLeft />
            Back
          </Link>

          <div className="h-4" />
          <h3 className="font-bold text-[18px]">{user.fullName}</h3>
        </div>

        <button
          className="text-white bg-linear-to-r from-[#51A3DA] to-[#60269E] rounded-lg py-3 px-4 flex items-center gap-3 font-medium"
          onClick={() => setIsMessageModalOpen(true)}
        >
          Message User
          <MessageSquareMore />
        </button>
      </div>

      <div className="h-5" />

      <div className="grid grid-cols-2 gap-10">
        {/* USER INFORMATION */}
        <div className="space-y-2 flex flex-col">
          <h4 className="text-[18px] font-semibold">User Information</h4>

          <div className="shadow-md shadow-[#7090B01A] p-5 rounded-lg flex-1">
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center gap-3">
                <Avatar className="size-12 border-[1.5px] border-[#51A3DA]">
                  <AvatarImage src={user.avatarUrl || ""} />
                  <AvatarFallback>
                    {user.fullName?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="text-[16px] font-semibold">{user.fullName}</p>
                  <p className="font-medium text-sm text-[#909090]">
                    Joined: {new Date(user.createdAt).toDateString()}
                  </p>
                </div>
              </div>

              <button
                className={`px-5 py-3 rounded-lg text-white ${
                  user.status === "ACTIVE" ? "bg-[#027A48]" : "bg-red-500"
                }`}
                onClick={handleStatusToggle}
              >
                {user.status === "ACTIVE" ? "Active" : "Deactivated"}
              </button>
            </div>

            <div className="h-5" />

            <div className="space-y-6">
              <InfoRow label="User ID" value={user.id} />
              <InfoRow label="Email Address" value={user.email} />
              <InfoRow label="Gender" value={user.gender || "Not provided"} />
              <InfoRow label="Age Group" value={user.ageGroup || "Not provided"} />
              <InfoRow label="Country" value={user.country || "Not provided"} />
              <InfoRow
                label="Last Login"
                value={
                  user.lastLoginAt
                    ? new Date(user.lastLoginAt).toDateString()
                    : "Not available"
                }
              />
            </div>
          </div>
        </div>

        <div className="space-y-2 flex flex-col">
          <h4 className="text-[18px] font-semibold">Current Plan</h4>

          <div className="shadow-md shadow-[#7090B01A] p-5 rounded-lg flex-1">
            {user.currentPlan ? (
              <>
                <div className="font-semibold">
                  <h3 className="text-[16px] text-[#222222] font-bold">
                    {user.currentPlan.plan} Plan -{" "}
                    {user.currentPlan.billingCycle}
                  </h3>
                  <p className="text-[32px] text-[#222222] font-bold ">
                    {user.currentPlan.currency}{" "}
                    {user.currentPlan.amount.toLocaleString()}
                  </p>
                </div>

                <form className="space-y-5">
                  <InputDisplay
                    label="Start Date"
                    value={new Date(user.currentPlan.startDate).toDateString()}
                  />
                  <InputDisplay
                    label="End Date"
                    value={new Date(user.currentPlan.endDate).toDateString()}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to cancel this subscription?"
                        )
                      ) {
                        cancelSubscription.mutate(user.id);
                      }
                    }}
                    disabled={
                      cancelSubscription.isPending ||
                      user.currentPlan.status === "CANCELLED" ||
                      !user.currentPlan.active
                    }
                    className="font-bold text-[14px] bg-linear-to-r from-[#51A3DA] to-[#60269E] py-3 px-4 rounded-[10px] text-white w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {cancelSubscription.isPending
                      ? "Cancelling..."
                      : user.currentPlan.status === "CANCELLED"
                      ? "Subscription Cancelled"
                      : "Cancel Subscription"}
                  </button>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <h3 className="text-[32px] font-bold text-[#222222] mb-2">
                  No Active Plan
                </h3>
                <p className="text-[16px] text-[#909090] text-center max-w-[300px] font-light">
                  This user is currently not subscribed to a plan, their current
                  plan will show here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="h-5" />

      {/* BILLING TABLE */}
      <div className="flex items-center justify-between">
        <p className="font-semibold text-[20px]">Billings</p>

        {/* <button className="px-5 py-3 bg-[#60269E] text-sm text-white rounded-lg flex items-center gap-3">
          Export CSV
          <Download size={18} />
        </button> */}
      </div>

      <div className="h-5" />

      <div className="border border-[#EAECF0] rounded-xl mb-10">
        <Table>
          <TableHeader className="bg-[#F9FAFB] border-b border-[#EAECF0]">
            <TableRow className="h-[45px]">
              <TableHead>Payment ID</TableHead>
              <TableHead>Payment Date</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isBillingsLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  Loading billings...
                </TableCell>
              </TableRow>
            ) : billingsData && billingsData.content.length > 0 ? (
              billingsData.content.map((item) => (
                <TableRow key={item.id} className="h-[70px] text-[14px]">
                  <TableCell>{item.paymentId}</TableCell>
                  <TableCell>
                    {new Date(item.paymentDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{item.plan}</TableCell>
                  <TableCell>
                    {item.currency} {item.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <p
                      className={`rounded-2xl px-3 py-1 w-fit ${
                        item.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : item.status === "SUCCESS"
                          ? "bg-[#ECFDF3] text-[#027A48]"
                          : item.status === "FAILED"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {item.status}
                    </p>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  No billings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {billingsData && billingsData.totalPages > 1 && (
          <div className="flex justify-between gap-5 items-center p-3 border-t border-[#EAECF0] bg-white rounded-b-lg">
            <p className="text-gray-700">
              Page {billingsData.page + 1} of {billingsData.totalPages}
            </p>
            <div className="flex gap-4">
              <button
                className="border border-[#D0D5DD] rounded-xl px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={handlePrevious}
                disabled={billingsData.first || currentPage === 0}
              >
                Previous
              </button>
              <button
                className="border border-[#D0D5DD] rounded-xl px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={handleNext}
                disabled={
                  billingsData.last ||
                  (billingsData.totalPages
                    ? currentPage >= billingsData.totalPages - 1
                    : false)
                }
              >
                Next
              </button>
            </div>
          </div>
        )}
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
const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      toast.success(`${label} copied to clipboard`);
    } catch (error) {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="flex items-center gap-10">
      <div className="grid grid-cols-2 w-full">
        <p className="text-[#253B4B] text-[16px] max-w-[100px] lg:max-w-[300px] truncate">
          {label}:
        </p>
        <p className="text-[16px] font-bold text-[#253B4B] truncate">{value}</p>
      </div>
      <button
        onClick={handleCopy}
        className="rounded-full hover:opacity-70 transition-opacity"
        aria-label={`Copy ${label}`}
      >
        <Image src={"/icons/copy-icon.svg"} alt="" width={25} height={25} />
      </button>
    </div>
  );
};

const InputDisplay = ({ label, value }: any) => (
  <div className="grid space-y-2">
    <label className="text-[#222222] text-[14px] font-bold">{label}</label>
    <input className="bg-[#F9F9F9] py-3 px-2" value={value} readOnly />
  </div>
);

export default UserDetailsPage;
