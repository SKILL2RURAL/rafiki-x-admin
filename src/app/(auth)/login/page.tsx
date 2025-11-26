import Image from "next/image";
import React from "react";
import AshBackground from "@/lib/assets/img/ash-background.png";
import logo from "@/lib/assets/img/logo-white.png";
import { LoginForm } from "@/components/Login/LoginForm";

const LoginPage = () => {
  return (
    <div className="relative bg-gradient">
      <Image
        src={AshBackground}
        alt="background image"
        className="h-screen w-screen z-[-1] top-0 left-0 opacity-50"
      />
      <div className="absolute top-0 left-0 z-50 h-screen w-screen flex flex-col items-center justify-center lg:grid grid-cols-2 gap-5">
        <div className="flex justify-center items-center px-10">
          <Image
            src={logo}
            alt="Rafiki X"
            className="w-[100px] h-[100px] lg:w-[500px] lg:h-[500px]"
          />
        </div>
        <div className="flex justify-center items-center">
          <div className="text-white lg:w-[400px] px-5">
            <h1 className="font-jakarta font-semibold text-[30px] text-center lg:text-left mb-4">
              Welcome, Login
            </h1>
            <p className="text-sm font-satoshi text-center lg:text-left mb-8">
              Please provide your login credentials
            </p>

            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
