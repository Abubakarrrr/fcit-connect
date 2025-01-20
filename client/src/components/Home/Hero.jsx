import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "../ui/animated-shiny-text";
import { ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useToast } from "@/hooks/use-toast";
import { RainbowButton } from "../ui/rainbow-button";

function AnimatedShinyTextDemo() {
  return (
    <div className="z-10 flex  items-center justify-center">
      <div
        className={cn(
          "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        )}
      >
      <Link to="/fyps">
      <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
          <span>✨ See what our students are building</span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText></Link>
      </div>
    </div>
  );
}

const Hero = () => {
  const { toast } = useToast();
  return (
    <div className="flex flex-col items-center text-center gap-6 py-20">
      <AnimatedShinyTextDemo />
      <h1 className="md:text-5xl text-3xl font-bold">
        FCIT Connect <br />
        All Our FYPs in one place
      </h1>
      <p className="max-w-3xl text-center">
        {" "}
        Upload, showcase, and connect with others in your academic community.
        Discover, collaborate, and make your ideas stand out with ease.
      </p>
      <div>
        <div className="space-x-4">
          <Link to="/signup">
            <RainbowButton className="px-6 py-5 text-sm">
              Get Started
              <ChevronRightIcon className="w-4 ml-2" />
            </RainbowButton>
          </Link>
          
          {/* <Button
            variant="outline"
            onClick={() => {
              toast({
                title: "Login Succesfully",
                description: "",
              });
            }}
          >
            Show Toast
          </Button> */}

          <Link to="/login">
            <Button variant="ghost" className="px-6 border py-5">
              Login <ChevronRightIcon />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
