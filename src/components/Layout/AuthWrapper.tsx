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
    // If the query is not loading and there's an error (e.g., 401),
    // it means the user is not authenticated. Redirect to login.
    if (!isLoading && error) {
      router.replace("/login");
    }
  }, [isLoading, error, router]);

  // While the useUser query is in-flight, show a loading spinner.
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        {/* <Spinner className="size-10" /> */}
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

  // If the user is authenticated (data exists and no error), render the children.
  if (user) {
    return <>{children}</>;
  }

  // If not loading but also no user (e.g., during the brief moment before redirect),
  // you can return null or a spinner to prevent content flashing.
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Image
        src={"/icons/logo-gradient.svg"}
        alt="Rafiki X"
        width={100}
        height={100}
        className="animate-pulse repeat-infinite"
      />
      {/* <Spinner className="size-10" /> */}
    </div>
  );
};

export default AuthWrapper;
