"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdmins } from "@/hook/useAdmin";
import download from "@/lib/assets/icons/download.png";
import searchIcon from "@/lib/assets/icons/search.png";
import Image from "next/image";
import { useState } from "react";
import { InviteModal } from "./InviteModal";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function TeamPage() {
  const { data: admins } = useAdmins();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="py-3 font-satoshi">
      {/* Header */}
      <div className="flex justify-between">
        {/* Search */}
        <div className="w-[212px] mb-4 flex md:w-[312px] h-[38px] items-center gap-2 max-w-xs rounded-lg border border-gray-300 bg-white/60 px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-[#51A3DA]/40 transition">
          <Image src={searchIcon} alt="Search" className="w-5 h-5 opacity-70" />
          <Input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // reset to page 1 on search
            }}
            className="flex-1 bg-transparent border-none focus-visible:ring-0 focus:outline-none text-sm placeholder:text-gray-400"
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <Button className="px-4 py-2 h-[38px] w-[147px] rounded-[8px] text-white bg-gradient">
              <Image src={download} alt="download" className="w-5 h-5 mr-2" />
              <span>Export CSV</span>
            </Button>
            {/* <Button className="px-4 py-2 h-[38px] w-[147px] rounded-[8px] text-white bg-gradient">
                    <Image src={user} alt="user" className="w-5 h-5 mr-2"/>
                    <span>Invite Member</span>
                </Button> */}
            <InviteModal />
          </div>
        </div>
      </div>

      {/* Team Members Info */}
      <p className="text-gray-500 mb-2">
        Team Members- {admins?.totalElements}
      </p>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="border-b bg-gray-50 text-gray-500 text-[13px]">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" className="accent-[#51A3DA]" />
              </th>
              <th className="px-4 py-3 font-medium">User ID</th>
              <th className="px-4 py-3 font-medium">User Details</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Date Joined</th>
              <th className="px-4 py-3 font-medium">Account Status</th>
            </tr>
          </thead>

          <tbody>
            {admins &&
              admins.content.map((team, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <input type="checkbox" className="accent-[#51A3DA]" />
                  </td>
                  <td className="px-4 py-4">{team.id}</td>
                  <td className="px-4 py-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={team.profilePhoto || ""} />
                      <AvatarFallback>
                        {team.firstName[0]}
                        {team.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {team.firstName} {team.lastName}
                      </p>
                      <p className="text-xs text-gray-400">{team.email}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">Admin</td>
                  <td className="px-4 py-4">
                    {new Date(team.createdAt).toDateString() || ""}
                  </td>
                  <td className="px-4 py-4">
                    <span
                    // className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    //   team.status === "Active"
                    //     ? "bg-[#ECFDF3] text-[#027A48]"
                    //     : "bg-[#FEF6F7] text-[#E71D36]"
                    // }`}
                    >
                      Active
                    </span>
                  </td>
                </tr>
              ))}

            {(!admins || admins.content.length === 0) && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-5 items-center mt-6 text-sm text-gray-600">
        <p>{/* Page {currentPage} of {totalPages || 1} */}</p>

        <div className="flex mx-auto gap-2">
          <button
            // onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 rounded-full border border-[#2390FA] flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 text-[#2390FA] text-[20px] font-bold"
          >
            &lt;
          </button>

          {/* {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded-full border flex items-center justify-center ${
                currentPage === page
                  ? "border-[#2390FA] text-[#2390FA]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))} */}

          <button
            // onClick={() => handlePageChange(currentPage + 1)}
            // disabled={currentPage === totalPages}
            className="w-8 h-8 rounded-full border border-[#2390FA] flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 text-[#2390FA] text-[20px] font-bold"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
