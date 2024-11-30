import CTASection from "@/components/Home/CTA";
import Hero from "@/components/Home/Hero";
import { PlaceholdersAndVanishInputDemo } from "@/components/Home/PlaceHolderVanish";
import Showcase from "@/components/Home/ShowCase";
import Stats from "@/components/Home/Stats";
import { Testimonials } from "@/components/Home/Testimonials";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";

const Home = () => {
  return (
    <>
      <Hero />
      <SearchWithKeywords />
      <Showcase />
      <Testimonials />
      <Stats />
      <PlaceholdersAndVanishInputDemo />
      <Layout>
        <CTASection />
      </Layout>
    </>
  );
};

export default Home;
