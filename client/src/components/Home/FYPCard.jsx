import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Eye } from "lucide-react";
import ImagesCarousel from "../shared/Carousel";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import { useToast } from "@/hooks/use-toast";

export default function FYPCard({ fyp }) {
  const { user } = useAuthStore();
  const { likeProject } = useProjectStore();
  const { toast } = useToast();
  const { _id, title, year, description, likes, views, images, thumbnail } =
    fyp;
  const imagesArray = [thumbnail];
  for (const image of images) {
    imagesArray.push(image);
  }
  const fypLink =
    user?.role === "admin" ? `/admin/fyps/${_id} ` : `/fyps/${_id}`;
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const likeP = async () => {
      if (isLiked && user?.role !== "admin") {
        setIsLoading(true);
        try {
          await likeProject(_id);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          console.log(error);
          toast({
            title: "Can't Like Project",
            description: "",
          });
        }
      }
    };
    likeP();
  }, [isLiked]);

  return (
      <Card className="overflow-hidden cursor-pointer" onClick={() => navigate(fypLink)}>
        <div className="relative">
          {/* <img
          src={imageUrl}
          alt={projectName}
          className="w-full aspect-video object-cover"
        /> */}
          <ImagesCarousel images={imagesArray} />
          {/* <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label="Like project"
        >
          <Heart className="w-4 h-4 text-red-500 hover:fill-red-500" />
        </button> */}
        </div>

        <CardHeader className="space-y-2 p-4">
          <div className="flex items-center justify-between">
            <div to={fypLink}>
              <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
            </div>
            <Badge variant="" className="ml-2 shrink-0">
              {year}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {description}
          </p>
        </CardHeader>

        <CardContent className="p-4 pt-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              disabled={isLoading}
            >
              <Heart
                className={`w-4 h-4 text-red-600 ${
                  isLiked ? "fill-red-500" : "fill-white"
                }`}
              />
              <span className="selection:bg-none">
                {isLiked ? likes + 1 : likes}
              </span>
            </button>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-black fill-gray-100" />
              <span>{views}</span>
            </div>
          </div>
        </CardContent>
      </Card>
  );
}
