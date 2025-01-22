import  Benefits  from "@/components/Home/Benefits";
import CTASection from "@/components/Home/CTA";
import FAQ from "@/components/Home/Faq";
import Hero from "@/components/Home/Hero";
import { IconCloudDemo } from "@/components/Home/IconCloud";
import Showcase from "@/components/Home/ShowCase";
import Stats from "@/components/Home/Stats";
import { Testimonials } from "@/components/Home/Testimonials";
import Layout from "@/components/shared/Layout";

const Home = () => {
  return (
    <>
      <Hero />
      <IconCloudDemo/> 
      <Benefits/>
      <Showcase />
      <Testimonials />
      <Stats />
      <FAQ/>
      <Layout className="py-16">
        <CTASection />
      </Layout>
      
    </>
  );
};

export default Home;
