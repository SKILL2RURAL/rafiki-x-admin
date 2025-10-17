"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import user from "@/lib/assets/icons/user.png"
import team from "@/lib/assets/icons/team.png";
import email from "@/lib/assets/icons/email.png";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type FormData = {
    fullname: string;
    email: string;
}

export function InviteModal() {
    const [formData, setFormData] = useState<FormData>({
        fullname: "",
        email: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("formData", formData)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="px-4 py-2 h-[38px] w-[147px] rounded-[8px] text-white bg-gradient">
                        <Image src={user} alt="user" className="w-5 h-5 mr-2"/>
                        <span>Invite Member</span>
                    </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[700px] rounded-xl px-8">
                <DialogHeader className="flex flex-col justify-center items-center">
                    <div>
                        <Image src={team} alt="team" className="w-[77px] h-[77px] mx-auto mb-4"/>
                        <DialogTitle className="text-center">Invite Team Member</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="space-y-6">
                    {/* Full Name */}
                    <div className="space-y-1 px-6">
                    <Label>Full Name</Label>
                    <div className="mb-4 flex h-[56px] items-center gap-2 w-full rounded-lg border border-gray-300 bg-white/60 px-3 py-1 shadow-sm focus-within:ring-2 focus-within:ring-[#51A3DA]/40 transition">
                        <Image src={user} alt="team" className="w-5 h-5" />
                        <Input
                        id="name"
                        name="fullname"
                        type="text"
                        placeholder="Enter Full Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        className="flex-1 border-none focus-visible:ring-0 focus:outline-none text-sm placeholder:text-gray-400"
                        />
                    </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-1 px-6">
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
                    <DialogFooter className="flex justify-center gap-6 mt-4">
                        <DialogClose asChild>
                        <Button
                            variant="outline"
                            className="relative p-[2px] w-[200.5px] h-[55px] rounded-[8px] bg-gradient-to-r from-[#51A3DA] to-[#60269E] hover:opacity-90 transition-all"
                        >
                            <div className="absolute inset-[1px] bg-white rounded-[7px] flex items-center justify-center">
                            <p className="bg-gradient-to-r from-[#51A3DA] to-[#60269E] bg-clip-text text-transparent font-semibold text-[16px]">
                                Cancel
                            </p>
                            </div>
                        </Button>
                        </DialogClose>

                        <Button type="button" onClick={handleSubmit} className="w-[200.5px] h-[55px] rounded-[8px] bg-gradient text-white px-4 py-2">
                            Send Invite
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}