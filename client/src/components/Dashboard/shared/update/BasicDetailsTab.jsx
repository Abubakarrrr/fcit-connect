import React, { useState } from "react";

import FypForm from "../fyp-form";
import FypThumbnail from "../fyp-thumbnail";
import { useProjectStore } from "@/store/projectStore";
import { Toast } from "@radix-ui/react-toast";
import { useToast } from "@/hooks/use-toast";

const BasicDetailsTab = ({
  formState,
  setFormState,
  thumbnailUrl = "",
  setThumbnailUrl,
  errors,
  setErrors,
  fileError,
}) => {
  const { deleteFile, uploadFile, project } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileSelect = async (e) => {
    try {
      setIsLoading(true);
      const file = e.target.files[0];
      if (project?._id) {
        const fileUrl = await uploadFile(file, project?._id, "THUMBNAIL");
        if (fileUrl) {
          setThumbnailUrl(fileUrl);
        }
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: error.response?.data?.message || "Error while uploading image",
        description: "",
      });
    }
  };

  const handleRemoveImage = async () => {
    try {
      setIsLoading(true);
      await deleteFile(thumbnailUrl, project?._id, "THUMBNAIL");
      setThumbnailUrl(null);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: error.response?.data?.message || "Error while removing image",
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
              isLoading={isLoading}
              fileError={fileError}
              imageUrl={thumbnailUrl}
              onFileSelect={handleFileSelect}
              onRemoveImage={handleRemoveImage}
            />
          </div>
        </div>
        {/* <div className="flex justify-end">
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
        </div> */}
      </form>
    </div>
  );
};

export default BasicDetailsTab;
