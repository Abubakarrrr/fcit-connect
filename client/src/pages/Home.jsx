import CTASection from "@/components/Home/CTA";
import { PlaceholdersAndVanishInputDemo } from "@/components/Home/PlaceHolderVanish";
import Showcase from "@/components/Home/ShowCase";
import { Testimonials } from "@/components/Home/Testimonials";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";

const Home = () => {
  return (
    <>
      <SearchWithKeywords />
      <Showcase />
      <Testimonials />
      <PlaceholdersAndVanishInputDemo />
      <Layout>
        <CTASection />
      </Layout>
    </>
  );
};

export default Home;
