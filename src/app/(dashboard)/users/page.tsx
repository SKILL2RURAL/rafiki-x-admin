"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useActivateUser, useDeactivateUser, useAdminUsers } from "@/hook/useUser";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const UsersPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [active, setActive] = React.useState("All");
  
  // FIXED: All hooks must be at the top, before any conditional returns
  const { data, isLoading, isError, error } = useAdminUsers();
  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-sm text-muted-foreground">Loading users...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="p-6">
        <p className="text-red-500 text-sm">
          Failed to load users. {String(error)}
        </p>
      </div>
    );
  }

  // Filter by name or email
  const filteredUsers =
    data?.filter((user) => {
      const q = searchQuery.toLowerCase();
      return (
        user.fullName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
      );
    }) ?? [];

  return (
    <div>
      <h1 className="text-[20px] font-bold">Users</h1>
      <p className="text-sm font-[400]">
        Oversee and manage all your order here
      </p>
      <div className="h-5" />
      {/* Metrics  */}
      <div className="grid grid-cols-3 gap-5">
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Total Users</p>
          <p className="text-[36px] font-bold text-primary">{data?.length ?? 0}</p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Active Users</p>
          <p className="text-[36px] font-bold text-primary">
            {data?.filter(u => u.status === "active").length ?? 0}
          </p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Deactivated Users</p>
          <p className="text-[36px] font-bold text-primary">
            {data?.filter(u => u.status === "deactivated").length ?? 0}
          </p>
        </div>
      </div>

      {/* filter  */}
      <div className="flex gap-5 mt-10 bg-[#F4F4F5] rounded-[8px] px-3 py-2 w-fit">
        {["All", "Active", "Deactivated"].map((item, index) => (
          <button
            key={index}
            className={`${
              active === item && "border border-[#51A3DA] bg-[#F2F8FC]"
            } px-5 py-1 rounded-[4px] `}
            onClick={() => setActive(item)}
          >
            <p
              className={` ${
                active === item
                  ? "bg-gradient-to-r from-[#51A3DA] to-[#60269E] text-transparent bg-clip-text font-bold"
                  : "text-[#4D5154] text-[14px]"
              }`}
            >
              {item}
            </p>
          </button>
        ))}
      </div>

      {/* Table  */}
      <div className="border border-[#EAECF0] rounded-[8px] my-10">
        <Table>
          <TableHeader className="bg-[#F9FAFB] border-b border-[#EAECF0] rounded-[8px]">
            <TableRow className="h-[45px]">
              <TableHead className="text-[#667085]">User ID</TableHead>
              <TableHead className="text-[#667085]">User</TableHead>
              <TableHead className="text-[#667085]">Email Address</TableHead>
              <TableHead className="text-[#667085]">Joined Date</TableHead>
              <TableHead className="text-[#667085]">Account Status</TableHead>
              <TableHead className="text-[#667085]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(filteredUsers ?? []).map((item) => (
              <TableRow
                key={item.id}
                className="h-[70px] text-[14px] cursor-pointer hover:bg-[#F9FAFB]"
                onClick={() => router.push(`/users/${item.id}`)}
              >
                <TableCell>
                  <p className="text-[14px] text-[#4D5154]">#{item.id}</p>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={item.avatarUrl ?? "https://github.com/shadcn.png"}
                        alt={item.fullName}
                      />
                      <AvatarFallback>{item.fullName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p>{item.fullName}</p>
                  </div>
                </TableCell>
                <TableCell className="text-[14px]">{item.email}</TableCell>
                <TableCell>{new Date(item.joinedDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <p className={`${
                    item.status === "active" 
                      ? "bg-[#ECFDF3] text-[#027A48]" 
                      : "bg-[#FEF3F2] text-[#B42318]"
                  } rounded-[16px] px-3 py-1 w-fit capitalize`}>
                    {item.status}
                  </p>
                </TableCell>
                <TableCell>
                  <div
                    className="p-2 border-[#E4E7EC] border rounded-[4px] w-fit cursor-pointer"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <EllipsisVertical />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="p-3">
                        <DropdownMenuItem 
                          className="text-[#313131] font-bold mb-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            activateUser.mutate(item.id);
                          }}
                        >
                          Activate User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-[#313131] font-bold my-3"
                          onClick={(e) => {
                            e.stopPropagation();
                            deactivateUser.mutate(item.id);
                          }}
                        >
                          Deactivate User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[#313131] font-bold mt-3">
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
    </div>
  );
};

export default UsersPage;