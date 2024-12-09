"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Mail } from "lucide-react";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmailInput from "../ui/Email-Input";
import PasswordInput from "../ui/Password-Input";

function AvatarDemo() {
  return (
    <Avatar className="h-16 w-16">
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}



export default function UserProfile() {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    // console.log(passwords)
  };
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
                        <EmailInput disabled placeholder="Email" />
                        <PasswordInput
                          id="oldPassword"
                          name="oldPassword"
                          type="password"
                          placeholder="Enter Old Password"
                          value={passwords.oldPassword}
                          onChange={handleChange}
                        />
                        <PasswordInput
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          placeholder="Enter New Password"
                          value={passwords.newPassword}
                          onChange={handleChange}
                        />
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
