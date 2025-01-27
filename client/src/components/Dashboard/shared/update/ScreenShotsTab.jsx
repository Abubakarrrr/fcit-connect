import React from "react";
import { X } from "lucide-react";
import { useProjectStore } from "@/store/projectStore";
import { useToast } from "@/hooks/use-toast";

const ScreenShotsTab = ({ images, setImages }) => {
  const { toast } = useToast();
  const { deleteFile, uploadFile, project, isLoading } = useProjectStore();
  const handleRemoveImage = async (index) => {
    try {
      await deleteFile(images[index], project?._id, "SCREENSHOT");
      setImages(images.filter((_, i) => i !== index));
    } catch (error) {
      console.log(error);
      toast({
        title: error?.response?.data.message || "error while deleting image",
        description: "",
      });
    }
  };

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length + images.length > 3) {
      alert("You can upload a maximum of 3 images.");
      return;
    }
    for (const file of files) {
      try {
        const fileUrl = await uploadFile(file, project?._id, "SCREENSHOT");
        setImages((prevImages) => [...prevImages, fileUrl]);
      } catch (error) {
        console.log(error);
        toast({
          title: error?.response?.data.message || "error while uploading image",
          description: "",
        });
      }
    }
  };
  return (
    <div className="py-6 px-4 rounded-lg border shadow-sm">
      <h1 className="text-lg font-semibold">Screenshots</h1>
      <div>
        <div className="space-y-4">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />

          <div className="grid grid-cols-3 gap-4">
            {images.length > 0 ? (
              images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden"
                >
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {!isLoading && (
                    <button
                      onClick={() => handleRemoveImage(index)}
                      disbaled={isLoading}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      aria-label={`Remove image ${index + 1}`}
                    >
                      <X size={16} />
                    </button>
                  )}

                  <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {index + 1}/3
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full h-[100px] flex items-center justify-center text-gray-400 col-span-3">
                No image selected
              </div>
            )}
          </div>
          <div className="flex flex-col items-center justify-center py-2">
            <label
              htmlFor="image-upload"
              className={`cursor-pointer text-[14px] px-4 py-2 bg-black text-white rounded-lg ${
                isLoading ? "pointer-events-none opacity-50" : ""
              }`}
            >
              {isLoading ? "Uploading..." : "Choose File(s)"}
            </label>
            <p className="text-[12px] mt-1 text-gray-500">
              {" "}
              Images upto 1 MB,max 3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenShotsTab;
