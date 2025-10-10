"use client";

import { ArrowLeft, Download, MessageSquareMore } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MessageUserModal from "@/components/Dashboard/MessageUserModal";

const UserDetailsPage = () => {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const tableData = [
    {
      id: "01",
      name: "Design Thinking",
      amount: "1",
      plan: "PREMIUM",
      paymentDate: "Sept, 10, 2023",
      status: "completed",
    },
    {
      id: "02",
      name: "Servant Leadership",
      amount: "2",
      plan: "PREMIUM",
      paymentDate: "Sept, 10, 2023",
      status: "completed",
    },
    {
      id: "03",
      name: "Vision Boarding",
      amount: "3",
      plan: "PREMIUM",
      paymentDate: "Sept, 10, 2023",
      status: "completed",
    },
    {
      id: "04",
      name: "Sustainable Development GoaL",
      amount: "1",
      plan: "BASIC",
      paymentDate: "Sept, 10, 2023",
      status: "completed",
    },
    {
      id: "05",
      name: "Money Management",
      amount: "5",
      plan: "PREMIUM",
      paymentDate: "Sept, 10, 2023",
      status: "completed",
    },
    {
      id: "005",
      name: "John Doe",
      amount: "2",
      plan: "PREMIUM",
      paymentDate: "Sept, 10, 2023",
      status: "completed",
    },
  ];

  // Function to handle form submission
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }
  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          {/* Navigation to go back  */}
          <Link href={"/users"} className="text-sm flex gap-2 items-center">
            <ArrowLeft />
            Back
          </Link>
          <div className="h-4" />

          {/* User Name  */}
          <h3 className="font-bold text-[18px]">John Doe</h3>
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
        {/* User Information  */}
        <div className="space-y-2">
          <h4 className="text-[18px] font-[600]">User Information</h4>
          <div className="shadow-md shadow-[#7090B01A] p-5 rounded-[4px]">
            <div className="flex justify-between items-center gap-5">
              <div className="flex items-center gap-3">
                <Avatar className="size-12 border-[1.5px] border-[#51A3DA]">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-[16px] font-[600]">Emmanuel Adebayo</p>
                  <p className="font-[500] text-sm text-[#909090]">
                    Joined 10th March, 2023
                  </p>
                </div>
              </div>
              <button className="px-7 py-2 bg-[#027A48] text-white rounded-[4px]">
                Active
              </button>
            </div>
            <div className="h-5" />
            <div className="space-y-5">
              <div className="flex items-center gap-10">
                <div className="grid grid-cols-2 w-full">
                  <p className="text-[#253B4B] text-[16px]">User ID :</p>
                  <p className="text-[16px] font-[600] text-[#253B4B]">
                    1204GHV HUIHHKJKN MK
                  </p>
                </div>
                <button className="rounded-full ">
                  <Image
                    src={"/icons/copy-icon.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div className="grid grid-cols-2 w-full">
                  <p className="text-[#253B4B] text-[16px]">Age group:</p>
                  <p className="text-[16px] font-[600] text-[#253B4B]">
                    20-24 years
                  </p>
                </div>
                <button className="rounded-full ">
                  <Image
                    src={"/icons/copy-icon.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div className="grid grid-cols-2 w-full">
                  <p className="text-[#253B4B] text-[16px]">Email Address:</p>
                  <p className="text-[16px] font-[600] text-[#253B4B]">
                    emmanueladebayo2012@gmail.com
                  </p>
                </div>
                <button className="rounded-full ">
                  <Image
                    src={"/icons/copy-icon.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div className="grid grid-cols-2 w-full">
                  <p className="text-[#253B4B] text-[16px]">Gender:</p>
                  <p className="text-[16px] font-[600] text-[#253B4B]">Male</p>
                </div>
                <button className="rounded-full ">
                  <Image
                    src={"/icons/copy-icon.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div className="grid grid-cols-2 w-full">
                  <p className="text-[#253B4B] text-[16px]">Country:</p>
                  <p className="text-[16px] font-[600] text-[#253B4B]">
                    Nigeria
                  </p>
                </div>
                <button className="rounded-full ">
                  <Image
                    src={"/icons/copy-icon.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                </button>
              </div>

              <div className="flex items-center gap-10">
                <div className="grid grid-cols-2 w-full">
                  <p className="text-[#253B4B] text-[16px]">
                    Last Logion Date:
                  </p>
                  <p className="text-[16px] font-[600] text-[#253B4B]">
                    10: 00AM, August 20, 2024
                  </p>
                </div>
                <button className="rounded-full ">
                  <Image
                    src={"/icons/copy-icon.svg"}
                    alt=""
                    width={25}
                    height={25}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Current Plans  */}
        <div className="space-y-2">
          <h4 className="text-[18px] font-[600]">Current Plan</h4>
          <div className="shadow-md shadow-[#7090B01A] p-5 rounded-[4px]">
            <div className="font-[600]">
              <h3 className="text-[16px]">Basic Plans Monthly</h3>
              <p className="text-[32px]">$400.00</p>
            </div>

            {/* Monthly Payment form   */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              {/* Start Date  */}
              <div className="grid space-y-2">
                <label className="text-[#222222] text-[14px] font-[600]">
                  Start Date
                </label>
                <input
                  className="bg-[#F9F9F9] py-3 px-2"
                  value={"October 10, 2025"}
                  readOnly
                />
              </div>

              {/* End Date  */}
              <div className="grid space-y-2">
                <label className="text-[#222222] text-[14px] font-[600]">
                  End Date
                </label>
                <input
                  className="bg-[#F9F9F9] py-3 px-2"
                  value={"November 10,  2025"}
                  readOnly
                />
              </div>

              <button
                type="submit"
                className="font-bold text-[14px] bg-gradient-to-r from-[#51A3DA] to-[#60269E] py-3 px-4 rounded-[10px] text-white w-full"
              >
                Cancel Subscription
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="h-5" />

      {/* Billings  */}
      <div className="flex items-center justify-between">
        <p className="font-[600] text-[20px]">Billings</p>
        <button className="px-5 py-3 bg-[#60269E] text-sm text-white rounded-[4px] flex items-center gap-3">
          Export CSV
          <Download size={18} />
        </button>
      </div>
      <div className="h-5" />

      {/* Table  */}
      <div className="border border-[#EAECF0] rounded-[8px] mb-10">
        <Table>
          <TableHeader className="bg-[#F9FAFB] border-b border-[#EAECF0] rounded-[8px]">
            <TableRow className="h-[45px]">
              <TableHead className="text-[#667085]">S/N</TableHead>
              <TableHead className="text-[#667085]">Payment ID</TableHead>
              <TableHead className="text-[#667085]">Payment Date</TableHead>
              <TableHead className="text-[#667085]">Plan</TableHead>
              <TableHead className="text-[#667085]">Amount</TableHead>
              <TableHead className="text-[#667085]">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((item) => (
              <TableRow
                key={item.id}
                className="h-[70px] text-[14px] cursor-pointer hover:bg-[#F9FAFB]"
              >
                <TableCell>
                  <p className="text-[14px] text-[#4D5154]">{item.id}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <p>{item.name}</p>
                  </div>
                </TableCell>
                <TableCell className="text-[14px]">
                  {item.paymentDate}
                </TableCell>
                <TableCell>{item.plan}</TableCell>
                <TableCell>{item.amount}</TableCell>
                <TableCell>
                  <p className="bg-[#ECFDF3] text-[#027A48] rounded-[16px] px-3 py-1 w-fit">
                    {item.status}
                  </p>
                </TableCell>
                <TableCell>
                  <div className="p-2 cursor-pointer flex items-center gap-2 ">
                    <p className="bg-gradient-to-r from-[#51A3DA] to-[#60269E] text-transparent bg-clip-text">
                      Download Invoice
                    </p>
                    <Download size={18} color="#60269E" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between gap-5 items-center p-3 border border-[#EAECF0] rounded-b-[8px]">
          <p>Page 1 of 10</p>
          <div className="space-x-4">
            <button className="border border-[#D0D5DD] rounded-[8px] px-3 py-1">
              Previous
            </button>
            <button className="border border-[#D0D5DD] rounded-[8px] px-3 py-1">
              Next
            </button>
          </div>
        </div>
      </div>
      <MessageUserModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
      />
    </div>
  );
};

export default UserDetailsPage;
