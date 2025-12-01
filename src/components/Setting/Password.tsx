import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useChangePassword } from "@/hook/useAuth";
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

type PasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const Password = () => {
  const { mutate, isPending } = useChangePassword();
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmNewPassword
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (passwordData.currentPassword.length < 8) {
      toast.error("Current password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (passwordData.confirmNewPassword.length < 8) {
      toast.error("Confirm password must be at least 8 characters long");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (passwordData.newPassword === passwordData.currentPassword) {
      toast.error("New password must be different from current password");
      return;
    }

    await mutate(passwordData, {
      onSuccess: () => {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        toast.success("Password updated successfully!");
      },
      onError: (error) => {
        toast.error(`${error.message}`);
      },
    });
  };

  return (
    <div className="py-2 space-y-8">
      <div>
        <h2>Password info</h2>
        <p className="text-[#667085]">
          Update your photo and personal details here.
        </p>
      </div>
      <div className="w-full h-px bg-[#EAECF0] border" />
      <form onSubmit={handleSubmit} className="space-y-6 max-w-[40vw]">
        {/* Current Password */}
        <div className="space-y-1">
          <Label htmlFor="currentPassword" className="text-[#878787]">
            Current password
          </Label>
          <Input
            id="currentPassword"
            name="currentPassword"
            type="password"
            required
            placeholder="Enter your current password"
            value={passwordData.currentPassword}
            onChange={handleChange}
            className="w-w-full h-[64px] rounded-md border p-4 border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#51A3DA] mt-3"
          />
        </div>
        {/* New Password */}
        <div>
          <Label htmlFor="newPassword">New password</Label>
          <Input
            id="newPassword"
            name="newPassword"
            type="password"
            required
            placeholder="Enter your new password"
            value={passwordData.newPassword}
            onChange={handleChange}
            className="w-full h-[64px] rounded-md border p-4 border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#51A3DA] mt-3"
          />
          {/* <p className="text-[#667085]">
            Your new password must be longer than 8 characters
          </p> */}
        </div>
        {/* Confirm New Password */}
        <div>
          <Label htmlFor="confirmNewPassword">Confirm new password</Label>
          <Input
            id="confirmNewPassword"
            name="confirmNewPassword"
            type="password"
            required
            placeholder="Confirm your new password"
            value={passwordData.confirmNewPassword}
            onChange={handleChange}
            className="w-full h-[64px] rounded-md border p-4 border-gray-300 bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#51A3DA] mt-3"
          />
        </div>
        {/* Save Button */}
        <div className="flex  mt-8 gap-5">
          <Button
            type="button"
            className="h-[52px] w-[200px] rounded-[12px] text-[#344054] bg-white border border-[#D0D5DD] hover:bg-[#F7FBFD]"
          >
            Cancel
          </Button>
          <button
            type="submit"
            className="text-white bg-gradient w-full h-[52px] rounded-[12px] border border-gradient flex items-center justify-center"
          >
            {isPending ? <Spinner /> : "Update password"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Password;
