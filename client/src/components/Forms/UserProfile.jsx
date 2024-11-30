"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function AvatarDemo() {
  return (
    <Avatar className="h-16 w-16">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

function PasswordInput({title}) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prevState) => !prevState);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          id="input-23"
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
function EmailInput() {
  return (
    <div className="">
      <div className="relative">
        <Input
        disabled
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

export default function UserProfile() {
  return (
    <>
      <div className="  px-2 sm:px-8 lg:px-16">
        <div className="py-8">
          <div className="mx-auto">
            <form>
              <div className="max-w-lg mx-auto">
                {/* Card */}
                <Card>
                  <CardHeader className="text-center flex flex-col items-center">
                  <AvatarDemo />
                    <h2 className="text-3xl font-semibold leading-none tracking-tight capitalize p4-5">
                      Profile
                    </h2>
                  </CardHeader>
                  <CardContent>
                    <div className="mt-5">
                      {/* Grid */}
                      <div className="flex flex-col gap-4">
                        <Input placeholder="Name" disabled/>
                        <EmailInput />
                        <PasswordInput title="Enter Old Password"/>
                        <PasswordInput title="Enter New Password"/>
                        <Link to={"#"}></Link>
                        <Button className="mt-3 col-span-2">
                          Change Password
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
