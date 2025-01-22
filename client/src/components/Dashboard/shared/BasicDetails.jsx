import React, { useState } from "react";
import FypForm from "./fyp-form";
import FypThumbnail from "./fyp-thumbnail";
import { initialState, validationSchema } from "./formSchema";
import { Button } from "@/components/ui/button";
import { CookingPot, PlusCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ID, storage } from "../../../utils/appwriteConfig";
const BasicDetails = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const saveTemplateLink = isAdminRoute
    ? "/admin/fyps/update/1"
    : "/user/fyps/update/1";
  const navigate = useNavigate();
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: validationSchema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  const handleChange = (field, value) => {
    // Update form state
    setFormState((prev) => ({ ...prev, [field]: value }));

    // Clear error for that field when user starts typing
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };
  const [File, setFile] = useState(null);
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // const { error } = validationSchema.validate(formState, {
    //   abortEarly: false,
    // });

    // if (error) {
    //   const errorMessages = error.details.reduce(
    //     (acc, curr) => ({ ...acc, [curr.path[0]]: curr.message }),
    //     {}
    //   );
    //   setErrors(errorMessages);
    //   return;
    // }

    // Submit form logic
    console.log("Thumbnail url", thumbnailUrl);
    console.log("File", File);
    const screenshotResult = await storage.createFile(
      "678faed20020cb101db1",
      ID.unique(),
      File
    );
    if (screenshotResult) {
      console.log("File Uploadd: ", screenshotResult);
    }

    // navigate(saveTemplateLink);
  };

  return (
    <div className="py-6 px-4 rounded-lg border shadow-sm">
      <form onSubmit={handleSubmit}>
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
              imageUrl={thumbnailUrl}
              onFileSelect={handleFileSelect}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            variant=""
            className="aspect-square max-sm:p-0"
            // onClick={handleSubmit}
          >
            <PlusCircle
              className=" sm:-ms-1 sm:me-2"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="max-sm:sr-only">Save Changes</span>
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;
