import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, X } from "lucide-react";
import { FilePlus } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
const DocumentationTab = ({ file, setFile }) => {
  const { deleteFile, uploadFile, project } = useProjectStore();
  const fileInputRef = useRef(null);

  const handleFileSelect = async(e) => {
    const selectedFile = e.target.files[0];
    const url = await uploadFile(selectedFile,"documentation",project?._id);
    console.log(url);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="py-6 px-4 rounded-lg border shadow-sm">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-lg font-semibold">
            Upload the FYP Documentation
          </h1>
          {!file && (
            <p className="text-red-500 text-[12px]">
              Please upload in PDF format
            </p>
          )}

          {!file ? (
            <div className="flex flex-col items-center">
              <Button
                className="flex items-center mt-4"
                onClick={handleButtonClick}
              >
                <FilePlus size={16} className="mr-2" />
                Choose File
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="flex justify-between items-center w-full mb-2">
                <p className="text-sm text-gray-600">
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </p>
                <button onClick={handleRemoveFile} className="text-red-500">
                  <X size={16} />
                </button>
              </div>
              <p className="text-sm text-gray-500">Preview (PDF):</p>
              <embed
                src={URL.createObjectURL(file)}
                type="application/pdf"
                className="w-full h-60 mt-2 border rounded-md"
              />
            </div>
          )}

          <p className="text-[12px] mt-1 text-gray-500">Less than (1 MB)</p>
        </div>
      </div>
      {/* <div className="flex justify-end mt-6">
        <Button variant="" className="aspect-square max-sm:p-0">
          <PlusCircle
            className=" sm:-ms-1 sm:me-2"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span className="max-sm:sr-only">Save Changes</span>
        </Button>
      </div> */}
    </div>
  );
};

export default DocumentationTab;
