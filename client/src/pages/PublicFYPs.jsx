import FYPsListing from "@/components/Home/FYPsListing";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";
import { useProjectStore } from "@/store/projectStore";
import React, { useEffect } from "react";



const PublicFYPs = () => {
  const { allProjects, getAllProjects } = useProjectStore();

  useEffect(() => {
    const getP = async() => {
      await getAllProjects()
    }
    getP()
    
  }, [])
  
  return (
    <Layout>
      <SearchWithKeywords />
      <FYPsListing allProjects={allProjects}/>
    </Layout>
  );
};

export default PublicFYPs;
