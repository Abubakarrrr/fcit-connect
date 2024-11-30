import HeroVideoDialog from "../ui/hero-video-dialog";
export function HeroVideoDialogDemo() {
  return (
    <div className="relative py-8">
      <HeroVideoDialog
        className="dark:hidden block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-light.png"
        thumbnailAlt="Hero Video"
      />
      <HeroVideoDialog
        className="hidden dark:block"
        animationStyle="from-center"
        videoSrc="https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb"
        thumbnailSrc="https://startup-template-sage.vercel.app/hero-dark.png"
        thumbnailAlt="Hero Video"
      />
    </div>
  );
}

const PredictiveAnalysis = () => {
  return (
    <div className="">
      <h2 className="mb-8 text-center text-5xl font-bold leading-[1.2] tracking-tighter text-slate-900">
        See how it works
      </h2>
      <HeroVideoDialogDemo />
    </div>
  );
};

export default PredictiveAnalysis;
