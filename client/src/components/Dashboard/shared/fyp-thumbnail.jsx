import React from "react";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import ErrorMessage from "@/components/shared/ErrorMessage";

export default function FypThumbnail({
  imageUrl="",
  onFileSelect,
  onRemoveImage,
  fileError,
}) {
  console.log(imageUrl)
  return (
    <div className="p-4 border rounded-lg relative">
      <h2 className="text-lg text-center font-semibold">FYP Thumbnail</h2>
      <p className="text-[12px] text-red-500 text-center">
        The Image must be 1920 x 1440
      </p>

      <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden my-4 relative">
        {imageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt="thumbnail preview"
              className="w-full h-full object-cover"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={onRemoveImage}
              className="absolute top-2 right-2 bg-white rounded-full shadow p-1 text-red-600 hover:text-red-800 transition"
              title="Remove Image"
            >
              <XCircle size={20} />
            </button>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image selected
          </div>
        )}
      </div>

      {/* Upload Button (Only shows when no image is uploaded) */}
      {!imageUrl && (
        <div className="flex flex-col items-center gap-2">
          <Button
            variant=""
            className=""
            type="button"
            onClick={() => document.getElementById("thumbnail").click()}
          >
            Choose File
          </Button>
          <input
            id="thumbnail"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={onFileSelect}
          />
          <span className="text-[12px] text-gray-500">Image (1MB)</span>
          <ErrorMessage message={fileError} />
        </div>
      )}
    </div>
  );
}
