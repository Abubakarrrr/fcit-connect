import FYPsListing from "@/components/Home/FYPsListing";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";
import { useProjectStore } from "@/store/projectStore";
import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";

const PublicFYPs = () => {
  const { allProjects, getAllProjects } = useProjectStore();
  useEffect(() => {
    function getp() {
      getAllProjects();
      console.log(allProjects);
    }
    getp();
  }, []);
  if (allProjects.length == 0) return <div>Loading...</div>
  return (
    <Layout>
      <SearchWithKeywords />
      <FYPsListing allProjects={allProjects} />
    </Layout>
  );
};

export default PublicFYPs;
