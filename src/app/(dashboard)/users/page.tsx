"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  useActivateUser,
  useDeactivateUser,
  useAdminUsers,
  useDeleteUser,
} from "@/hook/useUser";

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
import UsersMetrics from "../../../components/Dashboard/Users/UsersMetrics";

const UsersPage = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = React.useState("");
  const [active, setActive] = React.useState("All");
  const [currentPage, setCurrentPage] = React.useState(0);
  const ITEMS_PER_PAGE = 10;

  const { data, isLoading, isError, error } = useAdminUsers({
    page: currentPage,
    size: ITEMS_PER_PAGE,
  });
  const activateUser = useActivateUser();
  const deactivateUser = useDeactivateUser();
  const deleteUserMutation = useDeleteUser();

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

  // Filter by name or email (client-side filtering for search)
  let filteredUsers =
    data?.content?.filter((user) => {
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        user.fullName.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q)
      );
    }) ?? [];

  // Filter by status (client-side filtering)
  if (active === "Active") {
    filteredUsers = filteredUsers.filter((user) => user.status === "active");
  } else if (active === "Deactivated") {
    filteredUsers = filteredUsers.filter(
      (user) => user.status === "deactivated"
    );
  }
  // "All" shows everything

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (data && !data.last) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteUser = (userId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUserMutation.mutate(userId);
    }
  };

  return (
    <div>
      <h1 className="text-[20px] font-bold">Users</h1>
      <p className="text-sm font-normal">
        Oversee and manage all your order here
      </p>
      <div className="h-5" />
      {/* Metrics  */}
      <UsersMetrics data={data?.content || []} isLoading={isLoading} />

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
                  ? "bg-linear-to-r from-[#51A3DA] to-[#60269E] text-transparent bg-clip-text font-bold"
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
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((item) => (
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
                          src={item.avatarUrl ?? ""}
                          alt={item.fullName}
                        />
                        <AvatarFallback>
                          {item.fullName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <p>{item.fullName}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-[14px]">{item.email}</TableCell>
                  <TableCell>
                    {new Date(item.joinedDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <p
                      className={`${
                        item.status === "active"
                          ? "bg-[#ECFDF3] text-[#027A48]"
                          : "bg-[#FEF3F2] text-[#B42318]"
                      } rounded-[16px] px-3 py-1 w-fit capitalize`}
                    >
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
                            disabled={item.status === "active"}
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
                            disabled={item.status === "deactivated"}
                          >
                            Deactivate User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-[#313131] font-bold mt-3"
                            onClick={(e) => handleDeleteUser(item.id, e)}
                          >
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <div className="flex justify-between gap-5 items-center p-3 border-t border-[#EAECF0] bg-white rounded-b-lg">
          <p className="text-gray-700">
            Page {data ? data.page + 1 : 1} of {data?.totalPages || 1}
          </p>
          <div className="flex gap-4">
            <button
              className="border border-[#D0D5DD] rounded-[8px] px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={handlePrevious}
              disabled={data?.first || currentPage === 0}
            >
              Previous
            </button>
            <button
              className="border border-[#D0D5DD] rounded-[8px] px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              onClick={handleNext}
              disabled={
                data?.last ||
                (data?.totalPages ? currentPage >= data.totalPages - 1 : false)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
