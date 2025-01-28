import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FypShowcase from "./FypShowcase";
import Layout from "@/components/shared/Layout";
import { useProjectStore } from "@/store/projectStore";
import SkeletonCard from "@/components/shared/SkeletonCard";

const FypDetails = () => {
  const { id } = useParams();
  const { project, getSingleProject } = useProjectStore();
  useEffect(() => {
    const getP = async () => {
      await getSingleProject(id);
      console.log("project")
      console.log(project)
    };
    getP();
  }, []);
  if (!project) {
    return <SkeletonCard/>;
  }

  return (
    <div>
      <Layout className="py-10 bg-[#F3F8FF]">
        {project && <FypShowcase fyp={project} />}
      </Layout>
    </div>
  );
};

export default FypDetails;
