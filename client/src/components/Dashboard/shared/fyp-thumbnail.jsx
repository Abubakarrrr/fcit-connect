import { Button } from "@/components/ui/button"

export default function FypThumbnail({ imageUrl, onFileSelect }) {
  return (
    <div className="p-4 border rounded-lg ">
      <h2 className="text-lg text-center font-semibold">FYP Thumbnail</h2>
      <p className="text-[12px] text-red-500 text-center">The Image must be 1920 x 1440</p>
      
      <div className="aspect-[3/2] bg-gray-100 rounded-lg overflow-hidden my-4">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt="thumbnail preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            No image selected
          </div>
        )}
      </div>
      
      <div className="flex flex-col items-center gap-2">
        <Button 
          variant="" 
          className=""
          onClick={() => document.getElementById('thumbnail-upload').click()}
        >
          Choose File
        </Button>
        <input
          id="thumbnail-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onFileSelect}
        />
        <span className="text-[12px] text-gray-500">Image (1MB)</span>
      </div>
    </div>
  )
}

