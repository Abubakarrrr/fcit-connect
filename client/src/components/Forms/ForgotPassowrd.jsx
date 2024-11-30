"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "../ui/input";
import { Mail } from "lucide-react";
import { MoveLeft } from "lucide-react";
import { Link } from "react-router-dom";
function EmailInput() {
  return (
    <div className="">
      <div className="relative">
        <Input
          id="input-10"
          className="peer pe-9"
          placeholder="Email"
          type="email"
        />
        <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
          <Mail size={16} strokeWidth={2} aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

export default function ForgotPassword() {
  return (
    <>
      <div className="  px-2 sm:px-8 lg:px-16">
        <div className="py-8">
          <div className="mx-auto">
            <form>
              <div className="max-w-lg mx-auto">
                {/* Card */}
                <Card>
                  <CardHeader className="text-center">
                    <h2 className="text-2xl mb-2 font-semibold leading-none tracking-tight capitalize">
                      Forgot Password
                    </h2>
                    <CardDescription>
                      Enter  your email address and we&apos;ll send you a link to reset your password
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      {/* Grid */}
                      <div className="flex flex-col gap-4">
                        <EmailInput />
                        <Button className="mt-3 col-span-2 capitalize">Send reset Link</Button>
                        <Link to="/login">
                        <div className="flex items-center justify-center">
                         <MoveLeft className="w-4"/>
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
