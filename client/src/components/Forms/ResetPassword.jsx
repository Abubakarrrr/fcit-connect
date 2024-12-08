"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

function PasswordInput({ title }) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          className="pe-9"
          placeholder={title}
          type={isVisible ? "text" : "password"}
        />
        <button
          className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-lg text-muted-foreground/80 outline-offset-2 transition-colors hover:text-foreground focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          type="button"
          onClick={toggleVisibility}
          aria-label={isVisible ? "Hide password" : "Show password"}
          aria-pressed={isVisible}
          aria-controls="password"
        >
          {isVisible ? (
            <EyeOff size={16} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Eye size={16} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const { resetPassword, error, isLoading, message } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await resetPassword(token, password, confirmPassword);
      toast({
        title: "Password Reset Successfully",
        description: "redirecting to login page...",
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast({
        title: error.message || "Error Resetting Password",
        description: "",
      });
    }
  };

  return (
    <>
      <div className="  px-2 sm:px-8 lg:px-16">
        <div className="py-8">
          <div className="mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="max-w-lg mx-auto">
                {/* Card */}
                <Card>
                  <CardHeader className="text-center">
                    <h2 className="text-2xl mb-2 font-semibold leading-none tracking-tight capitalize">
                      Reset Password
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      {/* Grid */}
                      <div className="flex flex-col gap-4">
                        <PasswordInput title="New Password" />
                        <PasswordInput title="Confirm New Password" />
                        <Button className="mt-3 col-span-2 capitalize">
                          set new password
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
