import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Github, Linkedin, Mail } from "lucide-react";

export default function TeamMember({ teamMembers }) {
  return <TeamMemberCard members={teamMembers} />;
}

function TeamMemberCard({ members }) {
  return (
    <div className="py-12 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {members?.map((member, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <CardContent className="p-0">
                <div className="relative group">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <Avatar className="w-32 h-32">
                      <AvatarFallback className="text-4xl font-bold bg-primary text-primary-foreground">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-white text-center">
                      {member.name && <p className="font-semibold text-lg">{member.name}</p>}
                      {member.role && <p className="text-sm">{member.role}</p>}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  {member?.rollNo && (
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      Roll No: {member.rollNo}
                    </p>
                  )}
                  <div className="flex justify-center space-x-2">
                    <TooltipProvider>
                      {member?.github && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                window.open(member.github, "_blank")
                              }
                            >
                              <Github className="h-4 w-4" />
                              <span className="sr-only">GitHub</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>GitHub Profile</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {member?.linkedin && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                window.open(member.linkedin, "_blank")
                              }
                            >
                              <Linkedin className="h-4 w-4" />
                              <span className="sr-only">LinkedIn</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>LinkedIn Profile</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {member.email && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                (window.location.href = `mailto:${member.email}`)
                              }
                            >
                              <Mail className="h-4 w-4" />
                              <span className="sr-only">Email</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Send Email</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </TooltipProvider>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
