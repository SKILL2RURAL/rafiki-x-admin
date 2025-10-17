import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button";

type PasswordData = {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const Password = () => {
    const [passwordData, setPasswordData] = useState<PasswordData>({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLElement>) =>  {
        const {name, value} = e.target as HTMLInputElement;
        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault();
        console.log("passwordData", passwordData)
    }

  return (
    <div className="py-2 space-y-8">
        <div>
            <h2>Password info</h2>
            <p className="text-[#667085]">Update your photo and personal details here.</p>
        </div>
        <div className="w-full h-[1px] bg-[#EAECF0] border"/>
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div className="space-y-1">
                <Label htmlFor="currentPassword" className="text-[#878787]">
                    Current password
                </Label>
                <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    placeholder=".............."
                    value={passwordData.currentPassword}
                    onChange={handleChange}
                    className="w-[546px] h-[64px] rounded-md border p-4 border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#51A3DA] mt-3"
                />
            </div>
            {/* New Password */}
            <div>
                <Label htmlFor="newPassword">New password</Label>
                <Input 
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    placeholder="............."
                    value={passwordData.newPassword}
                    onChange={handleChange}
                    className="w-[546px] h-[64px] rounded-md border p-4 border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#51A3DA] mt-3"
                />
                <p className="text-[#667085]">Your new password must be longer than 8 characters</p>
            </div>
            {/* Confirm New Password */}
            <div>
                <Label htmlFor="confirmNewPassword">Confirm new password</Label>
                <Input 
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type="password"
                    placeholder="............."
                    value={passwordData.confirmNewPassword}
                    onChange={handleChange}
                    className="w-[546px] h-[64px] rounded-md border p-4 border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#51A3DA] mt-3"
                    />
            </div>
            {/* Save Button */}
            <div className="w-[546px] flex items-center justify-between mt-8">
                <Button className="w-[137px] h-[52px] rounded-[12px] text-[#344054] bg-white border border-[#D0D5DD] hover:bg-[#F7FBFD]">Cancel</Button>
                <Button type="submit" className="text-white bg-gradient w-[338px] h-[52px] rounded-[12px] border border-gradient">Update password</Button>
            </div>
        </form>
    </div>
  )

}

export default Password