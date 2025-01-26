import React from "react";


import FypForm from "../fyp-form";
import FypThumbnail from "../fyp-thumbnail";
import { useProjectStore } from "@/store/projectStore";

const BasicDetailsTab = ({
  formState,
  setFormState,
  thumbnailUrl,
  setThumbnailUrl,
  errors,
  setErrors,
  fileError,
}) => {
  

  const { deleteFile,uploadFile,project } = useProjectStore();

  const handleChange = (field, value) => {
    // Update form state
    setFormState((prev) => ({ ...prev, [field]: value }));

    // Clear error for that field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleFileSelect =async (e) => {
    const file = e.target.files[0];
    const fileUrl = await uploadFile(file, "thumbnail", project._id);
    console.log(fileUrl);
    if (fileUrl) {
      setThumbnailUrl(fileUrl);
    }
  };

  const handleRemoveImage = async () => {
    // await deleteFile(thumbnailUrl); 
    setThumbnailUrl(null);
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
