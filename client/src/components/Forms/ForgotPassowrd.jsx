"use client";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { MoveLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import EmailInput from "../ui/Email-Input";


export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  
  const { isLoading, forgotPassword, message } = useAuthStore();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    toast({
      title: message,
      description: "",
    });
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
                      Forgot Password
                    </h2>
                    <CardDescription>
                      Enter your email address and we&apos;ll send you a link to
                      reset your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      {/* Grid */}
                      <div className="flex flex-col gap-4">
                        <EmailInput
                          name="email"
                          id="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={handleChange}
                        />
                        <Button className="mt-3 col-span-2 capitalize">
                          Send reset Link
                        </Button>
                        <Link to="/login">
                          <div className="flex items-center justify-center">
                            <MoveLeft className="w-4" />
                            <p className="text-center ml-2"> Back to Login</p>
                          </div>
                        </Link>
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
