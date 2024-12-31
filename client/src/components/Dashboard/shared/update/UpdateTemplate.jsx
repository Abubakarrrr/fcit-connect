import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicDetails from "../BasicDetails";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import DocumentationTab from "./DocumentationTab";
import ScreenShotsTab from "./ScreenShotsTab";
import TeamMemberTab from "./TeamMemberTab";
import TechStackTab from "./TechStackTab";

const UpdateTemplate = () => {
  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b">
        <h1 className="font-bold text-xl">ecommerce app</h1>
        <div className="space-x-2">
          <Button variant="outline">Preview</Button>
          <Button className="">View Live</Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="py-2">
        <TabsList className="">
          <TabsTrigger value="details">Basic Details</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
          <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
          <TabsTrigger value="readme">Whats Included</TabsTrigger>
          <TabsTrigger value="techstack">Tech stack</TabsTrigger>
          <TabsTrigger value="team">Team members</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <BasicDetails />
        </TabsContent>
        <TabsContent value="documentation">
          <DocumentationTab />
        </TabsContent>
        <TabsContent value="screenshots">
          <ScreenShotsTab />
        </TabsContent>
        <TabsContent value="team">
          <TeamMemberTab />
        </TabsContent>
        <TabsContent value="techstack">
          <TechStackTab />
        </TabsContent>
      </Tabs>
      <div className="flex justify-end">
        <ButtonDemo />
      </div>
    </div>
  );
};

export default UpdateTemplate;

function ButtonDemo() {
  return (
    <Button variant="" className="aspect-square max-sm:p-0">
      <PlusCircle
        className=" sm:-ms-1 sm:me-2"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
      <span className="max-sm:sr-only">Save Changes</span>
    </Button>
  );
}
