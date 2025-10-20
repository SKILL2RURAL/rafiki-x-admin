"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // 👈 icons for show/hide

import { loginSchema, LoginSchemaData } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  const form = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginSchemaData) {
    console.log(values);
    router.push("/");
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 font-satoshi">
        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email address"
                  {...field}
                  className="w-[400px] h-[40px] rounded-md border border-white/20 bg-[#D0D5DD]/20 px-4 py-2 text-white placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 backdrop-blur-sm"
                />
              </FormControl>
              <FormMessage className="text-lg text-red-600 !important" />
            </FormItem>
          )}
        />

        {/* Password */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <div className="relative w-[400px]">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    {...field}
                    className="w-full h-[40px] rounded-md border border-white/20 bg-[#D0D5DD]/20 px-4 pr-10 py-2 text-white placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white"
                    tabIndex={-1}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage className="text-lg text-red-600 !important" />
            </FormItem>
          )}
        />

        {/* Remember + Forgot Password */}
        <div className="text-[12px] flex justify-between items-center font-satoshi-regular">
          <div className="flex items-center gap-2">
            <Checkbox />
            <p>Remember me</p>
          </div>
          <Link href="/">Forgot Password?</Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-[400px] h-[48px] rounded-[8px] bg-gradient">
          Log in
        </Button>
      </form>
    </Form>
  );
}
