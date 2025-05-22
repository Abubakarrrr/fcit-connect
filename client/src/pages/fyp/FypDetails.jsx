import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FypShowcase from "./FypShowcase";
import Layout from "@/components/shared/Layout";
import { useProjectStore } from "@/store/projectStore";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { useAuthStore } from "@/store/authStore";

const FypDetails = () => {
  const { id } = useParams();
  const { getSingleProject, sudo_getSingleProject } = useProjectStore();
  const { user } = useAuthStore();
  const [project, setProject] = useState();
  useEffect(() => {
    const getProject = async () => {
      if (user?.role === "admin") {
        const p = await sudo_getSingleProject(id);
        setProject(p);
      } else {
        const p2 = await getSingleProject(id);
        setProject(p2);
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
