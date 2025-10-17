import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import React, { useRef, useState } from "react";

const MessageUserModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if file size is greater than 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert("File size must not exceed 5MB.");
        // Clear the file input
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="top-10 translate-y-0 min-w-[680px]">
        <DialogHeader>
          <DialogTitle className="text-center">Send Message</DialogTitle>
        </DialogHeader>
        <form className="space-y-3">
          {/* Title  */}
          <div>
            <label className="font-[500] text-[16px]">Title</label>
            <input className="border-[#C4C4C4] border rounded-[10px] block h-[55px] w-full px-3 mt-2" />
          </div>

          <div>
            <label className="font-[500] text-[16px]">Message</label>
            <textarea className="border-[#C4C4C4] border rounded-[10px] block h-[55px] w-full p-3 mt-2 min-h-[150px]" />
          </div>

          {/* Image  */}
          <div>
            <label className="font-[500] text-[16px]">Image</label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/svg+xml, image/png, image/jpeg, image/gif"
            />
            <div
              className="border-[#C4C4C4] border rounded-[10px] flex gap-3 items-center w-full p-3 mt-2 cursor-pointer"
              onClick={handleImageContainerClick}
              onKeyDown={(e) =>
                e.key === "Enter" && handleImageContainerClick()
              }
              role="button"
              tabIndex={0}
            >
              <div className="border-[0.3px] border-[#C4C4C4] h-[78px] w-[120px] flex items-center justify-center bg-[#F9F9F9] rounded-[4px]">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Image preview"
                    width={120}
                    height={78}
                    className="object-cover h-full w-full rounded-[4px]"
                  />
                ) : (
                  <Image
                    src={"/icons/image-icon.svg"}
                    alt=""
                    width={20}
                    height={20}
                  />
                )}
              </div>
              <div>
                <h3 className="text-[#262424] text-sm">Add Image</h3>
                <p className="text-[#B8B8B8] text-[12px]">
                  Click to upload image
                </p>
                <p className="text-[#B8B8B8] text-[12px]">
                  SVG, PNG, JPG or GIF (max. 800x400px)
                </p>
              </div>
            </div>
          </div>

          <div className="h-5" />
          <button
            type="submit"
            className="font-bold text-[14px] bg-gradient-to-r from-[#51A3DA] to-[#60269E] py-3 px-4 rounded-[10px] text-white w-full"
          >
            Send Message
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageUserModal;
