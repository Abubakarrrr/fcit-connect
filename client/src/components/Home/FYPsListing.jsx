import React, { useState } from "react";
import FYPCard from "./FYPCard";
import Dropdown from "../shared/Dropdown";
import PaginationDemo from "../shared/Pagination";


const FYPsListing = ({allProjects}) => {
  const [selectedCampus, setSelectedCampus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null);
console.log(allProjects)
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
          list={["All", "Sir Hassan Khan", "Sir Abdul Mateen", "Sir Umair Babar"]}
          selected={selectedSupervisor}
          handleSelect={setSelectedSupervisor}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {allProjects && allProjects.length > 0 &&  allProjects?.map((fyp, index) => {
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
