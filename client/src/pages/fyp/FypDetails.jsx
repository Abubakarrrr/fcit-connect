import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import FypShowcase from "./FypShowcase";
import Layout from "@/components/shared/Layout";
import { useProjectStore } from "@/store/projectStore";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { useAuthStore } from "@/store/authStore";

const FypDetails = () => {
  const { id } = useParams();
  const { project, getSingleProject, sudo_getSingleProject } =
    useProjectStore();
  const { user } = useAuthStore();
  useEffect(() => {
    const getProject = async () => {
      if (user?.role == "admin") {
        await sudo_getSingleProject(id);
      } else if (user?.role == "user") {
        await getSingleProject(id);
      }
    };
    getProject();
  }, []);
  if (!project) {
    return <SkeletonCard />;
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
