import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Eye, ChartNoAxesColumnIncreasing } from "lucide-react";
import ImagesCarousel from "../shared/Carousel";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

export default function FYPCard({ fyp }) {
  const {
    _id,
    title,
    description,
    likes,
    views,
    images,
    year,
    
  } = fyp;



  return (
    <Card className="overflow-hidden">
      <div className="relative">
        {/* <img
          src={imageUrl}
          alt={projectName}
          className="w-full aspect-video object-cover"
        /> */}
        <ImagesCarousel images={images} />

        <button
          className="absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          aria-label="Like project"
        >
          <Heart className="w-5 h-5 text-white" />
        </button>
      </div>

      <CardHeader className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <Link to={`/fyps/${_id}`}>
            <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          </Link>
          <Badge variant="secondary" className="ml-2 shrink-0">
            {year}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{views}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
