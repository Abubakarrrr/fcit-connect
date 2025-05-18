"use client";
import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Input } from "../ui/input";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import PasswordInput from "../ui/Password-Input";

export default function ResetPassword() {
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const { resetPassword, error, isLoading, message } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(passwords);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = passwords;
    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match");
      toast({
        title: "Passwords do not match",
        description: "",
      });
      return;
    }
    try {
      await resetPassword(token, newPassword, confirmNewPassword);
        toast({
          title: "Password Reset Successfully",
          description: "Redirecting to login page...",
        });
        setTimeout(() => {
          navigate("/login");
        }, 500);
    } catch (error) {
      console.error(error);
      toast({
        title: error.response?.data?.message || "Error resetting password",
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
                        <PasswordInput
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="New Password"
                          value={passwords.newPassword}
                          onChange={handleChange}
                        />
                        <PasswordInput
                          id="confirmNewPassword"
                          name="confirmNewPassword"
                          type="password"
                          placeholder="Confirm New Password"
                          value={passwords.confirmNewPassword}
                          onChange={handleChange}
                        />
                        <Button
                          className="mt-3 col-span-2 capitalize"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "Set new password"}
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
