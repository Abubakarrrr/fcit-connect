import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentationTab from "./DocumentationTab";
import ScreenShotsTab from "./ScreenShotsTab";
import TeamMemberTab from "./TeamMemberTab";
import TechStackTab from "./TechStackTab";
import ReadmeTab from "./ReadmeTab";
import BasicDetailsTab from "./BasicDetailsTab";
import { initialState } from "../formSchema";

const UpdateTemplate = () => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [readme, setReadMe] = useState("");
  const [members, setMembers] = useState([]);
  const [techStack, setTechStack] = useState({
    frontend: [],
    backend: [],
    database: [],
    aiLibraries: [],
    devops: [],
    testing: [],
  });

  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b">
        <h1 className="font-bold text-xl">ecommerce app</h1>
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
          <BasicDetailsTab
           formState={formState}
           setFormState={setFormState}
           errors={errors}
           setErrors={setErrors}
           thumbnailUrl={thumbnailUrl}
           setThumbnailUrl={setThumbnailUrl}
          />
        </TabsContent>
        <TabsContent value="documentation">
          <DocumentationTab file={file} setFile={setFile} />
        </TabsContent>
        <TabsContent value="screenshots">
          <ScreenShotsTab images={images} setImages={setImages} />
        </TabsContent>
        <TabsContent value="team">
          <TeamMemberTab members={members} setMembers={setMembers} />
        </TabsContent>
        <TabsContent value="readme">
          <ReadmeTab value={readme} setValue={setReadMe} />
        </TabsContent>
        <TabsContent value="techstack">
          <TechStackTab techStack={techStack} setTechStack={setTechStack} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UpdateTemplate;
