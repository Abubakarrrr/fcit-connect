import React, { useState } from "react";
import Joi from "joi";
import FypForm from "./fyp-form";
import FypThumbnail from "./fyp-thumbnail";
import { initialState, validationSchema } from "./formSchema";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

const BasicDetails = () => {
  const [formState, setFormState] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [thumbnailUrl, setThumbnailUrl] = useState(null);

  const validateField = (name, value) => {
    const fieldSchema = Joi.object({ [name]: validationSchema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: value });
    return error ? error.details[0].message : null;
  };

  const handleChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
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
    }
    // Submit form logic
    console.log("Form submitted successfully!", formState);
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
          <ButtonDemo />
        </div>
      </form>
    </div>
  );
};

export default BasicDetails;

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
