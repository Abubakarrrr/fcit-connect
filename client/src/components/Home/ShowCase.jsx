import { Link } from "react-router-dom";
import { ChevronRightIcon, Heart } from "lucide-react";
import Marquee from "../ui/marquee";
import { useProjectStore } from "@/store/projectStore";
import { useEffect } from "react";
// import { useToast } from "@/hooks/use-toast";

// import { BackgroundLines } from "../ui/background-lines";

export function ShowcaseCard({ title, thumbnail, likes, _id }) {
  return (
    <Link
      to={`/fyps/${_id}`}
      className="flex w-[330px] h-[370px] flex-col gap-2 group relative overflow-hidden cursor-pointer"
    >
      <div className="absolute top-2 right-2 px-3 py-2 bg-red-100 rounded-lg flex items-center gap-2">
        <Heart className="w-4 h-4 text-red-500 fill-red-500" />
        <span className="text-red-500 font-medium text-sm">{likes}</span>
      </div>
      <img
        src={thumbnail}
        alt={title}
        className="size-full object-cover  max-h-[360px] rounded-xl border"
      />

      <div className="flex flex-col">
        <div className="group inline-flex cursor-pointer items-center justify-start gap-1 duration-200 hover:text-neutral-700 dark:hover:text-neutral-200 text-xl font-semibold text-neutral-700 dark:text-neutral-300 hover:underline underline-offset-4">
          {title}
          <ChevronRightIcon className="size-4 translate-x-0 opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
        {/* <p className="text-neutral-400 text-sm">{description}</p> */}
      </div>
    </Link>
  );
}

export default function Showcase() {
  const { top10Projects, getTop10Projects } = useProjectStore();
  // const { toast } = useToast();

  useEffect(() => {
    const getProjects = async () => {
      try {
        await getTop10Projects();
      } catch (error) {
        // console.log(error);
      }
    };
    getProjects();
  }, []);
  if (top10Projects && top10Projects.length > 0) {
    return (
      <section id="showcase" className="py-14 ">
        <div>
          <h2 className="mb-2 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-slate-900">
            Showcase
          </h2>
          <h3 className="mx-auto mb-8 text-balance text-center text-lg font-medium tracking-tight text-slate-900/80">
            Top 10 Featured FYPs.
          </h3>
        </div>
        <div className="relative flex flex-col">
          <Marquee className=" [--duration:40s]">
            {top10Projects.map((project, idx) => (
              <ShowcaseCard key={idx} {...project} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 h-full w-1/12 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 h-full  w-1/12 bg-gradient-to-l from-background"></div>
        </div>
      </section>
    );
  }
}
