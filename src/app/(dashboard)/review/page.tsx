"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MessageUserModal from "@/components/Dashboard/MessageUserModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import sms from "@/lib/assets/icons/sms.png";
import Image from "next/image";
import { useReviews } from "@/hook/useReviews";
import { Skeleton } from "@/components/ui/skeleton";

const page = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const { data: reviewsData, isLoading } = useReviews({
    page: currentPage,
    size: 10,
    sortBy: "createdAt",
    sortDir: "desc",
  });

  const reviews = reviewsData?.content || [];
  const totalPages = reviewsData?.totalPages || 0;
  const currentPageNumber = reviewsData?.page ?? 0;

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSendMessage = (userId: number) => {
    setSelectedUserId(userId.toString());
    setIsMessageModalOpen(true);
  };

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-[20px] font-bold mb-3">Reviews</h1>
        <p className="text-[14px]">Oversee and manage all your order here</p>
      </div>

      {/* Table */}
      <div className="border border-[#EAECF0] rounded-[8px] bg-white">
        {isLoading ? (
          <div className="p-8">
            <Skeleton className="h-[400px] w-full rounded-lg" />
          </div>
        ) : (
          <Table>
            {/* Table Header */}
            <TableHeader className="bg-[#F9FAFB] border-b border-[#EAECF0]">
              <TableRow className="h-[45px]">
                <TableHead className="text-[#667085] text-[13px] font-medium">
                  User ID
                </TableHead>
                <TableHead className="text-[#667085] text-[13px] font-medium">
                  User
                </TableHead>
                <TableHead className="text-[#667085] text-[13px] font-medium">
                  Email Address
                </TableHead>
                <TableHead className="text-[#667085] text-[13px] font-medium">
                  Rating
                </TableHead>
                <TableHead className="text-[#667085] text-[13px] font-medium">
                  Comment
                </TableHead>
                <TableHead className="text-[#667085] text-[13px] font-medium"></TableHead>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody>
              {reviews.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-gray-400"
                  >
                    No reviews found.
                  </TableCell>
                </TableRow>
              ) : (
                reviews.map((review) => {
                  const fullName = `${review.userFirstName} ${review.userLastName}`;
                  const initials = `${review.userFirstName.charAt(
                    0
                  )}${review.userLastName.charAt(0)}`;
                  return (
                    <TableRow key={review.id} className="h-[70px]">
                      <TableCell className="px-4 py-4">#{review.id}</TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={""} />
                            <AvatarFallback className="bg-[#B9DABB] text-black">
                              {initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{fullName}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        {review.userEmail}
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <span className="font-medium">{review.rating}</span>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <div className="flex items-center gap-4">
                          <p className="max-w-md text-gray-700">
                            {review.comment
                              ? review.comment.length > 80
                                ? `${review.comment.substring(0, 80)}...`
                                : review.comment
                              : "No comment"}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="px-4 py-4">
                        <button
                          className="text-[#51A3DA] flex items-center gap-2 font-medium hover:opacity-80 transition-opacity whitespace-nowrap"
                          onClick={() => handleSendMessage(review.userId)}
                        >
                          Send Message
                          <Image
                            src={sms}
                            alt="message Icon"
                            width={20}
                            height={20}
                          />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        )}

        {!isLoading && (
          <div className="flex justify-between gap-5 items-center p-3 border-t border-[#EAECF0] bg-white rounded-b-lg">
            <p className="text-gray-700">
              Page {currentPageNumber + 1} of {totalPages || 1}
            </p>
            <div className="flex gap-4">
              <button
                className="border border-[#D0D5DD] rounded-[8px] px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={handlePrevious}
                disabled={reviewsData?.first || currentPage === 0}
              >
                Previous
              </button>
              <button
                className="border border-[#D0D5DD] rounded-[8px] px-3 py-1 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={handleNext}
                disabled={reviewsData?.last || currentPage >= totalPages - 1}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <MessageUserModal
        userId={selectedUserId}
        isOpen={isMessageModalOpen}
        onClose={() => {
          setIsMessageModalOpen(false);
          setSelectedUserId("");
        }}
      />
    </div>
  );
};

export default page;
