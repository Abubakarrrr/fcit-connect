import  Benefits  from "@/components/Home/Benefits";
import CTASection from "@/components/Home/CTA";
import FYPsListing from "@/components/Home/FYPsListing";
import Hero from "@/components/Home/Hero";
import { IconCloudDemo } from "@/components/Home/IconCloud";
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
      <Showcase />
      <Testimonials />
      <Stats />
      <Layout className="py-16">
        <CTASection />
      </Layout>
      
    </>
  );
};

export default Home;
