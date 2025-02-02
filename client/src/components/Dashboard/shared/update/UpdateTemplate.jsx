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
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { LoadingSpinner } from "@/components/shared";
import { useAuthStore } from "@/store/authStore";
const UpdateTemplate = () => {
  const { toast } = useToast();
  const { user } = useAuthStore();

  const {
    getSingleUserProject,
    sudo_getSingleProject,
    project,
    updateProject,
    sudo_updateProject,
    teamMembers,
    isLoading,
  } = useProjectStore();
  const [isLoadingLc, setIsLoadingLc] = useState(false);

  const { id } = useParams();
  const [formState, setFormState] = useState(initialState);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const [thumbnailError, setThumbnailError] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
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

  useEffect(() => {
    if (user?.role == "admin") {
      const sudo_getProjectState = async () => {
        try {
          await sudo_getSingleProject(id);
        } catch (error) {
          console.log(error);
          toast({
            title: error.response?.data?.message || "Error Finding Project",
            description: "",
          });
        }
      };
      sudo_getProjectState();
    } else if (user?.role == "user") {
      const getProjectState = async () => {
        try {
          await getSingleUserProject(id);
        } catch (error) {
          console.log(error);
          toast({
            title: error.response?.data?.message || "Error Finding Project",
            description: "",
          });
        }
      };
      getProjectState();
    }
  }, [getSingleUserProject, id, sudo_getSingleProject]);
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
      project?.readme && setReadMe(project.readme);
      project?.thumbnail && setThumbnailUrl(project.thumbnail);
      project?.images?.length > 0 && setImages(project.images);
      project?.documentation && setFile(project.documentation);
      project?.teamMembers?.length > 0 && setMembers(project.teamMembers);
      setTechStack({
        frontend: project?.frontend || [],
        backend: project?.backend || [],
        database: project?.database || [],
        aiLibraries: project?.aiLibraries || [],
        devops: project?.devops || [],
        testing: project?.testing || [],
      });
    }
  }, [project, teamMembers]);

  const handleUpdate = async (e) => {
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
      toast({
        title: "Basic Details Tab information is missing",
        description: "",
      });
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
      toast({
        title: "Basic Details Tab information is missing",
        description: "",
      });
      return;
    } else {
      setThumbnailError("");
    }
    try {
      setIsLoadingLc(true);
      if (user?.role == "admin") {
        await sudo_updateProject(
          {
            ...formState,
            ...techStack,
            readme,
          },
          project?._id
        );
      } else if (user.role == "user") {
        await updateProject(
          {
            ...formState,
            ...techStack,
            readme,
          },
          project?._id
        );
      }
      setIsLoadingLc(false);
      toast({
        title: "Project Updated Successfully",
        description: "",
      });
    } catch (error) {
      setIsLoadingLc(false);
      console.log(error);
      toast({
        title: error.response?.data?.message || "Error Updating Project",
        description: "",
      });
    }
  };

  if (!project) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex justify-between items-center py-2 border-b">
        <h1 className="font-bold text-xl">{formState?.templateName}</h1>
        <Button
          variant=""
          className="aspect-square max-sm:p-0"
          onClick={handleUpdate}
          disabled={isLoading || isLoadingLc}
        >
          <PlusCircle
            className=" sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">
            {isLoadingLc ? "Updating..." : "Update FYP"}
          </span>
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
