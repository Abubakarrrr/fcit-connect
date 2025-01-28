import FYPsListing from "@/components/Home/FYPsListing";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";
import { useToast } from "@/hooks/use-toast";
import { useProjectStore } from "@/store/projectStore";
import { useScroll } from "framer-motion";
import React, { useEffect, useState } from "react";

const PublicFYPs = () => {
  const { allProjects, getAllProjects } = useProjectStore();
  const { toast } = useToast();

  useEffect(() => {
    const getProjects = async () => {
      try {
        await getAllProjects();
        
      } catch (error) {
        console.log(error);
        toast({
          title: error.response?.data?.message || "Error Fetching Projects",
          description: "",
        });
      }
      
    }
    getProjects();
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
