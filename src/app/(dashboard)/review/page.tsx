'use client';
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import MessageUserModal from '@/components/Dashboard/MessageUserModal';
import { useParams } from 'next/navigation';
import sms from "@/lib/assets/icons/sms.png"
import Image from 'next/image';


type reviewData = {
    id: string;
    user: string;
    email: string;
    rating: number;
    comment: string;
}

const reviews: reviewData[] = [
    {id: '#001', user: 'John Doe', email: 'johndoe@gmail.com', rating: 5, comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al...."},
    {id: '#001', user: 'John Doe', email: 'johndoe@gmail.com', rating: 5, comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al...."},
    {id: '#001', user: 'John Doe', email: 'johndoe@gmail.com', rating: 5, comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al...."},
    {id: '#001', user: 'John Doe', email: 'johndoe@gmail.com', rating: 5, comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al...."},
    {id: '#001', user: 'John Doe', email: 'johndoe@gmail.com', rating: 5, comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al...."},
    {id: '#001', user: 'John Doe', email: 'johndoe@gmail.com', rating: 5, comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al...."},
    {id: '#001', user: 'John Doe', email: 'johndoe@gmail.com', rating: 5, comment: "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut al...."},
]

const page = () => {
      const { userId }: { userId: string } = useParams();
    
    const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  return (
    <div>
        <div className='mb-5'>
            <h1 className='text-[20px] font-bold mb-3'>Reviews</h1>
            <p className='text-[14px]'>Oversee and manage all your order here</p>
        </div>

        {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
        <table className="min-w-full text-left text-sm text-gray-700">
          <thead className="border-b bg-gray-50 text-gray-500 text-[13px]">
            <tr>
              <th className="px-4 py-3 font-medium">User ID</th>
              <th className="px-4 py-3 font-medium">User</th>
              <th className="px-4 py-3 font-medium">Email Address</th>
              <th className="px-4 py-3 font-medium">Rating</th>
              <th className="px-4 py-3 font-medium">Comment</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((team, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-4">{team.id}</td>
                  <td className="px-4 py-4 flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={""} />
                      <AvatarFallback>
                        {team.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">
                        {team.user}
                      </p>
                      {/* <p className="text-xs text-gray-400">{team.email}</p> */}
                    </div>
                  </td>
                  <td className="px-4 py-4">{team.email}</td>
                  <td className="px-4 py-4">
                    {team.rating}
                  </td>
                  <td className="px-4 py-4">
                    <div className='flex items-center gap-4'>
                        <p>{team.comment}</p>
                        <button
                            className="text-[#60269E] py-3 px-4 flex items-center gap-3 font-medium"
                            onClick={() => setIsMessageModalOpen(true)}
                            >
                            Send Message
                            <Image src={sms} alt='message Icon' width={20} height={20} />
                            </button>
                    </div>
                    
                  </td>
                </tr>
              ))}

            {(!reviews || reviews.length === 0) && (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">
                  No results found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between gap-5 items-center p-3 border border-[#EAECF0] rounded-b-[8px]">
          <p>
            Page 1 of 10
          </p>
          <div className="space-x-4">
            <button
              className="border border-[#D0D5DD] rounded-[8px] px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                // onClick={handlePrevious}
            >
              Previous
            </button>
            <button
              className="border border-[#D0D5DD] rounded-[8px] px-3 py-1 disabled:opacity-50 disabled:cursor-not-allowed"
                // onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      <MessageUserModal
            userId={userId}
            isOpen={isMessageModalOpen}
            onClose={() => setIsMessageModalOpen(false)}
        />
    </div>
  )
}

export default page