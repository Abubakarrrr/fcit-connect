import HeroVideoDialog from "../ui/hero-video-dialog";
export function HeroVideoDialogDemo() {
  return (
    <div className="relative py-8">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="/predictive.mp4"
        thumbnailSrc="/predictive.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="/predictive.mp4"
        thumbnailSrc="/predictive.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}

const PredictiveAnalysis = () => {
  return (
    <div className="">
      <h2 className="mb-8 text-center text-5xl font-bold leading-[1.2]  bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent" >
        See how it works
      </h2>
      <HeroVideoDialogDemo />
    </div>
  );
};

export default PredictiveAnalysis;
