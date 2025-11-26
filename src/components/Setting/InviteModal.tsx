"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import user from "@/lib/assets/icons/user.png";
import team from "@/lib/assets/icons/team.png";
import email from "@/lib/assets/icons/email.png";
import { toast } from "sonner";
import { useInviteAdmin } from "@/hook/useAuth";
import { Spinner } from "../ui/spinner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type FormData = {
  lastName: string;
  firstName: string;
  email: string;
};

export function InviteModal() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    lastName: "",
    firstName: "",
  });

  const inviteAdmin = useInviteAdmin();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter an email address.");
      return;
    }

    inviteAdmin.mutate(formData, {
      onSuccess: () => {
        toast.success("Invitation sent successfully!");
        setFormData({ email: "", lastName: "", firstName: "" });
        setOpen(false); // Close the dialog on success
      },
      onError: (error) => {
        toast.error(`${error.message}`);
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 h-[38px] w-[147px] rounded-[8px] text-white bg-gradient">
          <Image src={user} alt="user" className="w-5 h-5 mr-2" />
          <span>Invite Member</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-[700px] rounded-xl px-8">
        <DialogHeader className="flex flex-col justify-center items-center">
          <div>
            <Image
              src={team}
              alt="team"
              className="w-[77px] h-[77px] mx-auto mb-4"
            />
            <DialogTitle className="text-center">
              Invite Team Member
            </DialogTitle>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>First Name</Label>
              <div className="flex h-[56px] items-center gap-2 w-full rounded-lg border border-gray-300 bg-white/60 px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-[#51A3DA]/40 transition">
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="flex-1 border-none focus-visible:ring-0 focus:outline-none text-sm placeholder:text-gray-400"
                />
              </div>
            </div>
            <div className="space-y-1">
              <Label>Last Name</Label>
              <div className="flex h-[56px] items-center gap-2 w-full rounded-lg border border-gray-300 bg-white/60 px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-[#51A3DA]/40 transition">
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="flex-1 border-none focus-visible:ring-0 focus:outline-none text-sm placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <Label>Email Address</Label>
            <div className="mb-4 flex h-[56px] items-center gap-2 w-full rounded-lg border border-gray-300 bg-white/60 px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-[#51A3DA]/40 transition">
              <Image src={email} alt="team" className="w-5 h-5 opacity-70" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 bg-transparent border-none focus-visible:ring-0 focus:outline-none text-sm placeholder:text-gray-400"
              />
            </div>
          </div>
          <DialogFooter className="grid grid-cols-2 gap-6 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="relative p-[2px] h-[55px] rounded-[8px] bg-gradient-to-r from-[#51A3DA] to-[#60269E] hover:opacity-90 transition-all"
            >
              <div className="absolute inset-[1px] bg-white rounded-[7px] flex items-center justify-center">
                <p className="bg-gradient-to-r from-[#51A3DA] to-[#60269E] bg-clip-text text-transparent font-semibold text-[16px]">
                  Cancel
                </p>
              </div>
            </Button>

            <Button
              type="submit"
              disabled={inviteAdmin.isPending}
              className=" h-[55px] rounded-[8px] bg-gradient text-white px-4 py-2 w-full"
            >
              {inviteAdmin.isPending ? <Spinner /> : "Send Invite"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
