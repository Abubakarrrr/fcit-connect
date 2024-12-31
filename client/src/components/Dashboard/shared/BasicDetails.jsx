import React, { useState } from "react";
import FypForm from "./fyp-form";
import FypThumbnail from "./fyp-thumbnail";

const BasicDetails = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [errors, setErrors] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailUrl(URL.createObjectURL(file));
    }
  };
  return (
    <div className="py-6 px-4 rounded-lg border shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
        <div className="space-y-6 col-span-2 ">
          <FypForm onSubmit={handleSubmit} errors={errors} />
        </div>
        <div className="col-span-1">
          <FypThumbnail
            imageUrl={thumbnailUrl}
            onFileSelect={handleFileSelect}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetails;
