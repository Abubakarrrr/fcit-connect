import React, { useState } from "react";
import FypForm from "./fyp-form";
import FypThumbnail from "./fyp-thumbnail";
import {
  initialState,
  validationSchema,
  thumbnailValidation,
} from "./formSchema";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useProjectStore } from "@/store/projectStore";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

const BasicDetails = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { createIntialProject, isLoading, storeError, message } =
    useProjectStore();
  const { user } = useAuthStore();
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [fileError, setfileError] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [File, setFile] = useState(null);

  const isAdminRoute = location.pathname.startsWith("/admin");
  const saveTemplateLink = isAdminRoute
    ? "/admin/fyps/update"
    : "/user/fyps/update";

  const handleChange = (field, value) => {
    // Update form state
    setFormState((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };
  // Handle removing the image
  const handleRemoveImage = () => {
    setFile(null);
    setThumbnailUrl(null);
  };

  const handleSubmit = async (e) => {
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
      setfileError("Please upload a thumbnail image");
      console.log(validationResult);
      return;
    } else {
      setfileError("");
    }
    try {
      const projectId = await createIntialProject({
        ...formState,
        thumbnail: File,
      });
      if (projectId) {
        toast({
          title: message,
          description: "",
        });
        navigate(`${saveTemplateLink}/${projectId}`);
      } else {
        toast({
          title: storeError,
          description: "",
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        title: error.message || "Failed to upload project",
        description: "",
      });
    }
  };

  return (
    <div className="py-6 px-4 rounded-lg border shadow-sm">
      <form>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-6 col-span-2">
            <FypForm
              formState={formState}
              errors={errors}
              onChange={handleChange}
            />
          </div>
          <div className="col-span-1">
            <FypThumbnail
              fileError={fileError}
              imageUrl={thumbnailUrl}
              onFileSelect={handleFileSelect}
              onRemoveImage={handleRemoveImage}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant=""
            className="aspect-square max-sm:p-0"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            <PlusCircle
              className=" sm:-ms-1 sm:me-2"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">
              {isLoading ? "Uploading..." : "Upload FYP"}
            </span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;
