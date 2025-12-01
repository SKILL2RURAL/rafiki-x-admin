"use client";

import { useUser } from "@/hook/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type AuthWrapperProps = {
  children: ReactNode;
};

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  const { data: user, isLoading, error } = useUser();

  useEffect(() => {
    if (!isLoading && error) {
      router.replace("/login");
    }
  }, [isLoading, error, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Image
          src={"/icons/logo-gradient.svg"}
          alt="Rafiki X"
          width={100}
          height={100}
          className="animate-pulse repeat-infinite"
        />
      </div>
    );
  }

  if (user) {
    return <>{children}</>;
  }
  // If not loading but also no user (e.g., during the brief moment before redirect),
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        src={"/icons/logo-gradient.svg"}
        alt="Rafiki X"
        width={100}
        height={100}
        className="animate-pulse repeat-infinite"
      />
    </div>
  );
};

export default AuthWrapper;
