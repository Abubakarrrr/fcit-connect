import { ArrowRight, ExternalLink } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import {
  User,
  Heart,
  Eye,
  PanelTop,
  Package,
  BookOpen,
  Layers,
} from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";
import { FaGithub } from "react-icons/fa";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RelatedFyps from "./RelatedFyps";
import Documentation from "./DocumentationTab";
import TeamMember from "./TeamMembersTab";
import TechStack from "./TechStackTab";
import { useAuthStore } from "@/store/authStore";
import ProjectApprovalCard from "./AdminApproval";
import { Badge } from "@/components/ui/badge";
import DOMPurify from "dompurify";
import Autoplay from "embla-carousel-autoplay";

function HTMLContent({ content }) {
  const sanitized = DOMPurify.sanitize(content);
  return <div className="ql-editor" dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

const getStatusBadge = (status) => {
  const statusValue = (status || "").toLowerCase();
  let color = "bg-gray-400";
  let text = "Pending";
  if (statusValue === "Approved") {
    color = "bg-green-600";
    text = "Approved";
  } else if (statusValue === "Rejected") {
    color = "bg-red-600";
    text = "Rejected";
  }
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${color}`}
    >
      {text}
    </span>
  );
};

export default function FypShowcase({ fyp }) {
  const { user } = useAuthStore();
  const {
    title,
    description,
    figmaLink,
    githubLink,
    deployLink,
    images,
    thumbnail,
    likes,
    campus,
    views,
    documentation,
    readme,
    teamMembers,
    frontend,
    backend,
    database,
    devops,
    testing,
    aiLibraries,
    createdByAdmin,
    status,
  } = fyp;
  const imagesArray = [thumbnail];
  for (const image of images) {
    imagesArray.push(image);
  }
  return (
    <div>
      {user?.role === "admin" && <ProjectApprovalCard id={fyp._id} />}
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center ">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{title}</h1>
              <p className="text-xl text-gray-600">{description}</p>
            </div>

            <div className="flex gap-4">
              {/* Icons */}
              <div className="flex items-center gap-3">
                {figmaLink && (
                  <a href={figmaLink} target="_blank" rel="noopener noreferrer">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl border flex items-center justify-center cursor-pointer">
                      <img src="/figma.png" className="w-8 h-8"></img>
                    </div>
                  </a>
                )}
                {githubLink && (
                  <a
                    href={githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-slate-50 rounded-xl border flex items-center justify-center cursor-pointer"
                  >
                    <FaGithub className="w-8 h-8" />
                  </a>
                )}
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
              </div>
            </div>

            <div className="flex max-sm:flex-col gap-4">
              {!createdByAdmin && (
                <a href={githubLink} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2" size="lg" to={githubLink}>
                    Get Access - $0 USD
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              )}

              {deployLink && (
                <a href={deployLink} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="lg" className="gap-2">
                    Live Preview
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>

            <div className="grid grid-cols-4 gap-8 md:p-8 p-4 border rounded-lg shadow-sm">
              <div>
                <User className="w-4 h-4" />
                <div className="font-semibold">
                  {user?.role == "admin"
                    ? "ADMIN"
                    : fyp?.user?.name?.split(" ")[0]}
                </div>
                <div className="text-sm text-gray-500">Creator</div>
              </div>
              <div>
                <PanelTop className="w-4 h-4" />
                <div className="font-semibold">Campus</div>
                <div className="text-sm text-gray-500">{campus}</div>
              </div>
              <div>
                <Heart className="w-4 h-4" />
                <div className="font-semibold">{likes.length}</div>
                <div className="text-sm text-gray-500">Likes</div>
              </div>
              <div>
                <Eye className="w-4 h-4" />
                <div className="font-semibold">{views}</div>
                <div className="text-sm text-gray-500">Views</div>
              </div>
            </div>
          </div>

          {/* Right Column - Carousel */}
          <div className="relative aspect-[4/3] bg-[#15171B] rounded-xl">
            <div className="absolute inset-5 bg-[#FFD84D] rounded-xl overflow-hidden flex items-center justify-center">
              <Carousel
                className="w-full "
                  plugins={[
                    Autoplay({
                      delay: 5000,
                      stopOnMouseEnter: true,
                    }),
                  ]}
              >
                <CarouselContent>
                  {imagesArray.map((image, index) => (
                    <CarouselItem key={index}>
                      <img
                        src={image}
                        alt="img"
                        className="w-full h-full object-cover"
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="z-10 absolute left-4 bg-white hover:bg-white/20 border-0" />
                <CarouselNext className="z-10 absolute right-4 bg-white hover:bg-white/20 border-0" />
              </Carousel>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 max-w-4xl mx-auto">
        <Tabs defaultValue="readme" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-2 mb-20 rounded">
            <TabsTrigger value="readme" className="rounded-md ">
              <div className="flex items-center gap-2">
                <Package className="w-6 h-6 mr-2" />
                <span>Readme</span>
              </div>
            </TabsTrigger>

            <TabsTrigger value="techstack" className="rounded-md ">
              <div className="flex items-center gap-2">
                <Layers className="w-6 h-6" />
                <span>Tech Stack</span>
              </div>
            </TabsTrigger>

            <TabsTrigger value="documentation" className="rounded-md ">
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                <span>Documentation</span>
              </div>
            </TabsTrigger>

            <TabsTrigger value="team" className="rounded-md ">
              <div className="flex items-center gap-2">
                <User className="w-6 h-6" />
                <span>Team members</span>
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent
            value="readme"
            className="bg-white border rounded-md p-6 shadow-sm"
          >
           <HTMLContent content={readme} />
          </TabsContent>
          <TabsContent
            value="techstack"
            className="bg-white border rounded-md p-6 shadow-sm"
          >
            <TechStack
              frontend={frontend}
              backend={backend}
              database={database}
              aiLibraries={aiLibraries}
              devops={devops}
              testing={testing}
            />
          </TabsContent>
          <TabsContent
            value="documentation"
            className="bg-white border rounded-md p-6 shadow-sm"
          >
            <Documentation
              title={title}
              documentation={documentation}
              name={fyp?.user?.name?.split(" ")[0]}
            />
          </TabsContent>
          <TabsContent
            value="team"
            className="bg-white border rounded-md p-6 shadow-sm"
          >
            <TeamMember teamMembers={teamMembers} />
          </TabsContent>
        </Tabs>
      </div>

      {user?.role === "user" && (
        <div>
          <h2 className="text-4xl font-bold text-center">Related Projects</h2>
          <RelatedFyps />
        </div>
      )}
    </div>
  );
}
