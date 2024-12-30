import React from "react";
import { useParams } from "react-router-dom";
import FypShowcase from "./fypShowcase";
import Layout from "@/components/shared/Layout";

const FypDetails = () => {
  const { id } = useParams();
  console.log(id);
  // Example data
  const fypProjects = [
    {
      id: 1,
      name: "Smart Waste Management System",
      description:
        "An IoT-based solution for efficient waste collection and management using smart bins and sensors.",
      images: [
        "https://example.com/images/waste-management1.jpg",
        "https://example.com/images/waste-management2.jpg",
        "https://example.com/images/waste-management3.jpg",
      ],
      batch: "2023",
      likes: 120,
      views: 450,
    },
    {
      id: 2,
      name: "AI-Powered Personal Finance Assistant",
      description:
        "A mobile application that helps users manage their finances with AI-powered insights and budgeting tools.",
      images: [
        "https://example.com/images/finance-assistant1.jpg",
        "https://example.com/images/finance-assistant2.jpg",
      ],
      batch: "2022",
      likes: 200,
      views: 800,
    },
    {
      id: 3,
      name: "Virtual Reality Museum Tour",
      description:
        "A VR application offering immersive virtual tours of famous museums around the world.",
      images: [
        "https://example.com/images/vr-museum1.jpg",
        "https://example.com/images/vr-museum2.jpg",
        "https://example.com/images/vr-museum3.jpg",
      ],
      batch: "2024",
      likes: 95,
      views: 300,
    },
    {
      id: 4,
      name: "Health Tracker with Wearable Integration",
      description:
        "A health tracking system that integrates with wearable devices to provide real-time health monitoring and analytics.",
      images: [
        "https://example.com/images/health-tracker1.jpg",
        "https://example.com/images/health-tracker2.jpg",
      ],
      batch: "2023",
      likes: 150,
      views: 500,
    },
    {
      id: 5,
      name: "E-Learning Platform for Rural Areas",
      description:
        "An e-learning platform designed to provide accessible and quality education to students in rural areas.",
      images: [
        "https://example.com/images/e-learning1.jpg",
        "https://example.com/images/e-learning2.jpg",
      ],
      batch: "2021",
      likes: 175,
      views: 650,
    },
  ];

  const fyp = fypProjects.find((p) => p.id === Number(id));
  console.log(fyp);

  if (!fyp) return <h1>fyp Not Found</h1>;

  return (
    <div>
      <Layout className="py-10 bg-[#F3F8FF]">
        <FypShowcase fyp={fyp} />
      </Layout>
    </div>
  );
};

export default FypDetails;
