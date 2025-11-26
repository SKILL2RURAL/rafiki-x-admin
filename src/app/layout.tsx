import Wrapper from "@/components/Layout/Wrapper";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Mulish } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "sonner";

const jakartaSans = localFont({
  src: [
    {
      path: "../../public/fonts/JakartaSans/PlusJakartaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/JakartaSans/PlusJakartaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/JakartaSans/PlusJakartaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
});

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/Satoshi/Satoshi-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Satoshi/Satoshi-Medium.otf",
      weight: "500",
      style: "normal",
    },
  ],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const mullish = Mulish({
  variable: "--mullish",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rafiki X Admin",
  // description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.className} ${mullish.className} ${jakartaSans.className} ${satoshi.className} antialiased`}>
        <Wrapper>{children}</Wrapper>
        <Toaster richColors position="top-right" duration={3000} />
      </body>
    </html>
  );
}
