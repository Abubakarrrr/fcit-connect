import FYPCard from "@/components/Home/FYPCard";
import React from "react";

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

const RelatedFyps = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 py-8">
        {fypProjects.map((fyp, index) => {
          return <FYPCard key={index} fyp={fyp} />;
        })}
      </div>
    </div>
  );
};

export default RelatedFyps;
