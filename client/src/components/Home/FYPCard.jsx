import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Eye } from "lucide-react";
import ImagesCarousel from "../shared/Carousel";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useProjectStore } from "@/store/projectStore";
import { useToast } from "@/hooks/use-toast";

export default function FYPCard({ fyp }) {
  const { user } = useAuthStore();
  const { likeProject, unLikeProject } = useProjectStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    _id,
    title,
    year,
    description,
    likes,
    views,
    images,
    thumbnail,
    status,
  } = fyp;
  const imagesArray = [thumbnail];
  for (const image of images) {
    imagesArray.push(image);
  }

  const fypLink =
    user?.role === "admin" ? `/admin/fyps/${_id} ` : `/fyps/${_id}`;
  const [isLiked, setIsLiked] = useState(false);
  const [allLikes, setAllLikes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (Array.isArray(likes)) {
      setAllLikes(likes);
    } else {
      setAllLikes([]);
    }
  }, [likes]);

  useEffect(() => {
    const likeIds = [];
    for (const id of allLikes) {
      likeIds.push(id);
    }
    setIsLiked(likeIds.includes(user?._id));
  }, [allLikes, user?._id]);

  const likeP = async () => {
    setIsLoading(true);
    if (!isLiked) {
      try {
        await likeProject(_id);
        setAllLikes([...allLikes, user._id]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Can't Like Project",
          description: "Please check if you are logged in",
        });
      }
    } else if (isLiked) {
      try {
        await unLikeProject(_id);
        setAllLikes(allLikes.filter((userId) => userId !== user._id));
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Can't Like Project",
          description: "Please check if you are logged in",
        });
      }
    }
  };

  return (
    <Card className="overflow-hidden ">
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

      <CardHeader
        className={`space-y-2 p-4 ${
          status === "Pending" && user?.role !== "admin"
            ? "cursor-default"
            : "cursor-pointer"
        }`}
        onClick={() => {
          if (status !== "Pending" || user?.role === "admin") {
            navigate(fypLink);
          }
        }}
      >
        <div className="flex items-center justify-between">
          <div to={fypLink}>
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          </div>

          <div className="flex items-center">
            <Badge
              variant=""
              className={`ml-2 shrink-0 hover:bg-gray-100 ${
                status === "Pending"
                  ? "text-red-600 bg-white"
                  : status === "Approved"
                  ? "text-green-600 bg-white hover:bg-gray-100"
                  : ""
              }`}
            >
              {status}
            </Badge>
            <Badge variant="" className="ml-2 shrink-0">
              {year}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      {status === "Approved" && (
        <CardContent className="p-4 pt-0">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <button
              className="flex items-center gap-1 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                likeP();
              }}
              disabled={isLoading}
            >
              <Heart
                className={`w-4 h-4 text-red-600 ${
                  isLiked ? "fill-red-500" : "fill-white"
                }`}
              />
              <span className="selection:bg-none">{allLikes?.length}</span>
            </button>
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4 text-black fill-gray-100" />
              <span>{views}</span>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
