"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UsersPage = () => {
  const router = useRouter();
  const [active, setActive] = React.useState("All");

  const tableData = [
    {
      id: "001",
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinedDate: "Sept, 10, 2023",
      status: "Deactived",
    },
    {
      id: "002",
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinedDate: "Sept, 10, 2023",
      status: "Deactived",
    },
    {
      id: "003",
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinedDate: "Sept, 10, 2023",
      status: "Deactived",
    },
    {
      id: "004",
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinedDate: "Sept, 10, 2023",
      status: "Deactived",
    },
    {
      id: "005",
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinedDate: "Sept, 10, 2023",
      status: "Deactived",
    },
    {
      id: "006",
      name: "John Doe",
      email: "johndoe@gmail.com",
      joinedDate: "Sept, 10, 2023",
      status: "Deactived",
    },
  ];

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
          <p className="text-[36px] font-bold text-primary">0</p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Active Users</p>
          <p className="text-[36px] font-bold text-primary">0</p>
        </div>
        <div className="border-[0.5px] rounded-[8px] border-[#D2D5DA] p-5">
          <p className="text-[14px] text-[#A3AED0]">Deactivated Users</p>
          <p className="text-[36px] font-bold text-primary">0</p>
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
            {tableData.map((item) => (
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
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p>{item.name}</p>
                  </div>
                </TableCell>
                <TableCell className="text-[14px]">{item.email}</TableCell>
                <TableCell>{item.joinedDate}</TableCell>
                <TableCell>
                  <p className="bg-[#ECFDF3] text-[#027A48] rounded-[16px] px-3 py-1 w-fit">
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
                        <DropdownMenuItem className="text-[#313131] font-bold mb-3">
                          Activate User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-[#313131] font-bold my-3">
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
