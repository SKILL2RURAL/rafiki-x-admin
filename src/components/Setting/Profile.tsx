"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check } from "lucide-react"
import addImage from "@/lib/assets/icons/addImage.png"

type FormState = {
  firstName: string
  email: string
  photo: string | null 
}

export default function ProfileForm() {
  const [form, setForm] = useState<FormState>({
    firstName: "Emmanuel Adebayo",
    email: "emmanuel@gmail.com",
    photo: null,
  })

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, photo: reader.result as string }))
    }
    reader.readAsDataURL(file)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // handle submit - send `form` to API
    console.log("Submitting form:", form)
  }

  return (
    <div className=" py-10">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-6 bg-white rounded-xl p-8"
      >
        {/* Profile Photo Section */}
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-[120px] h-[120px] rounded-full bg-gradient-to-br from-[#51A3DA] to-[#60269E] flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt="Profile photo"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span>OO</span>
              )}
            </div>

            <div className="absolute -bottom-1 -right-1 bg-[#51A3DA] w-[37.5px] h-[37.5px] rounded-full flex items-center justify-center border-2 border-white">
              <Check size={20} className="text-white" />
            </div>
          </div>

          <div className="flex flex-col">
            <Label className="font-medium text-[#878787] mb-2">Profile photo</Label>
            <p className="text-sm text-[#878787]">This image will be</p>
            <p className="text-sm text-[#878787]">displayed on your profile</p>

            <div className="mt-4">
              <label
                htmlFor="photo"
                className="w-[160px] h-[36px] rounded-[8px] inline-flex items-center space-x-2 border border-[#60269E] text-[#60269E] font-medium text-sm px-3 py-1.5 cursor-pointer hover:bg-[#51A3DA]/10 transition"
              >
                <Image src={addImage} alt="camera icon" className="w-[20px] h-[20px]"/>
                <span>Change Photo</span>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
            </div>
          </div>
        </div>

        {/* First Name */}
        <div className="space-y-1">
          <Label htmlFor="firstName" className="text-[#878787]">
            First name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Emmanuel Adebayo"
            value={form.firstName}
            onChange={handleInput}
            className="w-[546px] h-[64px] rounded-md border p-4 border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#51A3DA]"
          />
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <Label htmlFor="email" className="text-gray-700">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="emmanuel@gmail.com"
            value={form.email}
            onChange={handleInput}
            className="w-[546px] h-[64px] rounded-md border border-gray-200 bg-gray-100 text-gray-700"
          />
        </div>

        {/* Save Button */}
        <Button
          type="submit"
          className="w-[546px] h-[64px] bg-gradient text-white rounded-[12px] font-semibold hover:opacity-90 transition"
        >
          Save Changes
        </Button>
      </form>
    </div>
  )
}
