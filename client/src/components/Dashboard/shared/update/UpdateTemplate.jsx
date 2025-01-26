import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DocumentationTab from "./DocumentationTab";
import ScreenShotsTab from "./ScreenShotsTab";
import TeamMemberTab from "./TeamMemberTab";
import TechStackTab from "./TechStackTab";
import ReadmeTab from "./ReadmeTab";
import BasicDetailsTab from "./BasicDetailsTab";
import {
  initialState,
  thumbnailValidation,
  validationSchema,
} from "../formSchema";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";

const UpdateTemplate = () => {
  const { getSingleUserProject, project, updateProject,getAllTeamMembers ,teamMembers} = useProjectStore();
  const [formState, setFormState] = useState(initialState);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [thumbnailError, setThumbnailError] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [readme, setReadMe] = useState("");
  const [members, setMembers] = useState(null);
  const [techStack, setTechStack] = useState({
    frontend: [],
    backend: [],
    database: [],
    aiLibraries: [],
    devops: [],
    testing: [],
  });

  useEffect(() => {
    const getProjectState = async () => {
      await getSingleUserProject();
      await getAllTeamMembers();
    };
    getProjectState();
  }, []);
  useEffect(() => {
    if (project) {
      setFormState({
        templateName: project?.title || "",
        description: project?.description || "",
        campus: project?.campus || "",
        department: project?.department || "",
        year: project?.year || "",
        deployedLink: project?.deployedLink || "",
        githubLink: project?.githubLink || "",
        figmaLink: project?.figmaLink || "",
        category: project?.category || "",
        supervisor: project?.supervisor || "",
      });
      setThumbnailUrl(project?.thumbnail);
      setImages(project?.images);
      setMembers(teamMembers);
    }
  }, [project]);

  const handleUpdate = (e) => {
    e.preventDefault();

    const { error } = validationSchema.validate(formState, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error.details.reduce(
        (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
        {}
      );
      setErrors(errorMessages);
      return;
    } else {
      setErrors({});
    }
    const validationResult = thumbnailValidation.validate({
      thumbnail: thumbnailUrl,
    });
    if (validationResult.error) {
      setThumbnailError("Please upload a thumbnail image");
      console.log(validationResult);
      return;
    } else {
      setThumbnailError("");
    }
    // await updateProject({...formState,readme:JSON.stringify(readme),...techStack})
    console.log(
      formState,
      thumbnailUrl,
      file,
      images,
      JSON.stringify(readme),
      techStack,
      members
    );
  };

  if (!project) {
    return <div>Loading project...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b">
        <h1 className="font-bold text-xl">{formState?.templateName}</h1>
        <Button
          variant=""
          className="aspect-square max-sm:p-0"
          onClick={handleUpdate}
        >
          <PlusCircle
            className=" sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">Update FYP</span>
        </Button>
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
            thumbnailUrl={thumbnailUrl}
            setThumbnailUrl={setThumbnailUrl}
            errors={errors}
            setErrors={setErrors}
            fileError={thumbnailError}
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
