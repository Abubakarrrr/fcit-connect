import  Benefits  from "@/components/Home/Benefits";
import CTASection from "@/components/Home/CTA";
import Hero from "@/components/Home/Hero";
import { IconCloudDemo } from "@/components/Home/IconCloud";
import { PlaceholdersAndVanishInputDemo } from "@/components/Home/PlaceHolderVanish";
import PredictiveAnalysis from "@/components/Home/PredictiveAnalysis";
import Showcase from "@/components/Home/ShowCase";
import Stats from "@/components/Home/Stats";
import { Testimonials } from "@/components/Home/Testimonials";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";

const Home = () => {
  return (
    <>
      <Hero />
      <IconCloudDemo/> 
      <Benefits/>
      <SearchWithKeywords />
      <Showcase />
      <Testimonials />
      <Stats />
      <PlaceholdersAndVanishInputDemo />
      <Layout>
      <PredictiveAnalysis/>
      </Layout>
      <Layout>
        <CTASection />
      </Layout>
    </>
  );
};

export default Home;
