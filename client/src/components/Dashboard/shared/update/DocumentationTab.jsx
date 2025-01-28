import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, PlusCircle, X } from "lucide-react";
import { FilePlus } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import { useToast } from "@/hooks/use-toast";

const DocumentationTab = ({ file, setFile }) => {
  const { toast } = useToast();
  const { deleteFile, uploadFile, project, message } = useProjectStore();
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const selectedFile = e.target.files[0];
    try {
      const url = await uploadFile(selectedFile, project?._id, "DOCUMENTATION");
      setFile(url);
      toast({
        title: message || "File uploaded successfully",
        description: "",
      });
    } catch (error) {
      toast({
        title: message || "Failed to upload file",
        description: "",
      });
    }
  };

  const handleRemoveFile = async () => {
    try {
      await deleteFile(file, project?._id, "DOCUMENTATION");
      toast({
        title: message || "File deleted successfully",
        description: "",
      });
    } catch (error) {
      toast({
        title: message || "Error while deleting file",
        description: "",
      });
    }
    setFile(null);
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const { isLoading } = useProjectStore();
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
                disabled={isLoading}
              >
                <FilePlus size={16} className="mr-2" />
                {isLoading ? "Uploading..." : "Upload"}
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
              <p className="text-[12px] mt-1 text-gray-500">Less than (1 MB)</p>
            </div>
          ) : (
            <div className="flex flex-col items-center py-4">
              <div className="flex  ml-auto mb-2">
                <button
                  onClick={handleRemoveFile}
                  className="text-red-500"
                  disabled={isLoading}
                >
                  <X size={16} />
                </button>
              </div>
              {/* <p className="text-sm text-gray-500">Preview (PDF):</p> */}
              {file && (
                <a href={file} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2">
                    Preview
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          )}
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
