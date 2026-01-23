"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

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
import { toast } from "sonner";
import { Spinner } from "../ui/spinner";

const REMEMBER_ME_STORAGE_KEY = "rafiki_admin_remember_me";

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Initialize rememberMe state by checking localStorage
  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== "undefined") {
      const savedCredentials = localStorage.getItem(REMEMBER_ME_STORAGE_KEY);
      return !!savedCredentials;
    }
    return false;
  });

  // Initialize form with saved credentials if they exist
  const getInitialValues = (): LoginSchemaData => {
    if (typeof window !== "undefined") {
      const savedCredentials = localStorage.getItem(REMEMBER_ME_STORAGE_KEY);
      if (savedCredentials) {
        try {
          const { email, password } = JSON.parse(savedCredentials);
          return {
            email: email || "",
            password: password || "",
          };
        } catch (error) {
          console.error("Error parsing saved credentials:", error);
        }
      }
    }
    return {
      email: "",
      password: "",
    };
  };

  const form = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
    defaultValues: getInitialValues(),
  });

  async function onSubmit(values: LoginSchemaData) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // Save credentials if remember me is checked
        if (rememberMe && typeof window !== "undefined") {
          localStorage.setItem(
            REMEMBER_ME_STORAGE_KEY,
            JSON.stringify({
              email: values.email,
              password: values.password,
            })
          );
        } else if (!rememberMe && typeof window !== "undefined") {
          // Clear saved credentials if remember me is unchecked
          localStorage.removeItem(REMEMBER_ME_STORAGE_KEY);
        }

        router.push("/");
        router.refresh();
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login request failed:", error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 font-satoshi w-fit"
      >
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
                  required
                  {...field}
                  className="w-[400px] h-[40px] rounded-md border border-white/20 bg-[#D0D5DD]/20 px-4 py-2 text-white placeholder:text-gray-200 focus:outline-none  focus:ring-fuchsia-500/50 backdrop-blur-sm"
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
                    required
                    {...field}
                    className="w-full h-[40px] rounded-md border border-white/20 bg-[#D0D5DD]/20 px-4 pr-10 py-2 text-white placeholder:text-gray-200 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/50 backdrop-blur-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-300 hover:text-white"
                    tabIndex={-1}
                  >
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
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
            />
            <p>Remember me</p>
          </div>
          <Link href="/">Forgot Password?</Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-[400px] h-[48px] rounded-[8px] bg-gradient border text-[16px] font-medium border-white"
        >
          {isLoading ? <Spinner color="white" /> : "Log in"}
        </Button>
      </form>
    </Form>
  );
}
