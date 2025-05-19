"use client";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OTPInput } from "input-otp";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

export default function EmailVerify() {
  const [verificationCode, setVerificationCode] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const { error, isLoading, verifyEmail, user, resendVerificationEmail } = useAuthStore();
  const [resendCooldown, setResendCooldown] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast({
        title: "Email Verified Successfully",
        description: "",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: error.response?.data?.message || "Email verification failed",
        description: "",
      });
    }
  };

  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCooldown]);
  
  const handleResend = async () => {
    try {
      if (!user?.email) {
        toast({
          title: "User email not found",
          description: "Please sign up or log in again.",
        });
        return;
      }
      await resendVerificationEmail(user.email);
      setResendCooldown(300); 
      toast({
        title: "Verification email resent",
        description: "Please check your inbox.",
      });
    } catch (error) {
      toast({
        title: "Failed to resend verification email",
        description: error.response?.data?.message || "Try again later.",
      });
    }
  };

  return (
    <>
      <div className="px-2 sm:px-8 lg:px-16">
        <div className="py-8">
          <div className="mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="max-w-lg mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <h2 className="text-2xl mb-2 font-semibold leading-none tracking-tight capitalize">
                      Verify your email
                    </h2>
                    <CardDescription>
                      Enter the 6-digit code sent to your email address
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <div className="flex flex-col gap-4">
                        {/* Pass state and setter as props */}
                        <InputDemo
                          value={verificationCode}
                          onChange={setVerificationCode}
                        />
                        <Button
                          className="mt-3 col-span-2"
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? "Verifying" : "Verify Email"}
                        </Button>

                        <div className="mt-4 text-center text-sm text-muted-foreground">
                          Didn't receive an email?{" "}
                          <button
                            type="button"
                            onClick={handleResend}
                            className="text-primary hover:underline"
                            disabled={resendCooldown > 0}
                          >
                            Resend
                            {resendCooldown > 0 ? ` (${resendCooldown})` : ""}
                          </button>
                        </div>
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

function InputDemo({ value, onChange }) {
  return (
    <div className="flex justify-center">
      <OTPInput
        id="input-44"
        containerClassName="has-[:disabled]:opacity-50"
        maxLength={6}
        value={value}
        onChange={onChange}
        render={({ slots }) => (
          <div className="flex">
            {slots.map((slot, idx) => (
              <Slot key={idx} {...slot} />
            ))}
          </div>
        )}
      />
    </div>
  );
}

function Slot(props) {
  return (
    <div
      className={cn(
        "relative -ms-px flex size-12 items-center justify-center border border-input bg-background font-medium text-foreground shadow-sm shadow-black/5 transition-shadow first:ms-0 first:rounded-s-lg last:rounded-e-lg",
        { "z-10 border border-ring ring-[3px] ring-ring/20": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  );
}
