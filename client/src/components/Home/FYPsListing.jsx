import React, { useState } from "react";
import FYPCard from "./FYPCard";
import Dropdown from "../shared/DropDown";
import PaginationDemo from "../shared/Pagination";

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

const FYPsListing = () => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);

  return (
    <div className="py-8">
      <div className="flex justify-end gap-4 pb-8">
        <Dropdown
          trigger={"Campus"}
          list={["Both", "NC", "OC"]}
          selected={selectedCampus}
          handleSelect={setSelectedCampus}
        />
        <Dropdown
          trigger={"Department"}
          list={["All", "CS", "IT", "SE", "DS"]}
          selected={selectedDepartment}
          handleSelect={setSelectedDepartment}
        />
        <Dropdown
          trigger={"Year"}
          list={["All", "2021", "2022", "2023", "2024"]}
          selected={selectedYear}
          handleSelect={setSelectedYear}
        />
        <Dropdown
          trigger={"Category"}
          list={["All", "Blockchain", "AI", "Web", "Mobile"]}
          selected={selectedCategory}
          handleSelect={setSelectedCategory}
        />
        <Dropdown
          trigger={"Supervisor"}
          list={["All", "Hassan Khan", "Abdul Mateen", "Umair Babar"]}
          selected={selectedSupervisor}
          handleSelect={setSelectedSupervisor}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {fypProjects.map((fyp, index) => {
          return <FYPCard key={index} fyp={fyp} />;
        })}
      </div>
      <div className="my-8">
        <PaginationDemo />
      </div>
    </div>
  );
};

export default FYPsListing;
