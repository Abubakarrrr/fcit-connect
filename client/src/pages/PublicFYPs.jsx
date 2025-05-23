import FYPsListing from "@/components/Home/FYPsListing";
import Dropdown from "@/components/shared/Dropdown";
import Layout from "@/components/shared/Layout";
import SearchWithKeywords from "@/components/shared/SearchComponent";
import SkeletonCard from "@/components/shared/SkeletonCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useProjectStore } from "@/store/projectStore";
import { useEffect, useState } from "react";

const PublicFYPs = () => {
  const { projectsPaginated, getProjectsPaginate, categories, supervisors } =
    useProjectStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    campus: undefined,
    department: undefined,
    year: undefined,
    category: undefined,
    supervisor: undefined,
  });
  const [selectedCampus, setSelectedCampus] = useState("All");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSupervisor, setSelectedSupervisor] = useState("All");
  const updatedCategories = categories ? ["All", ...categories] : [];
  const updatedSupervisors = supervisors ? ["All", ...supervisors] : [];
  const [search, setSearch] = useState("");

  const handleResetFilters = () => {
    setSelectedCampus("All");
    setSelectedDepartment("All");
    setSelectedYear("All");
    setSelectedCategory("All");
    setSelectedSupervisor("All");
  };

  useEffect(() => {
    const getProjects = async () => {
      setIsLoading(true);
      try {
        await getProjectsPaginate(page, 10, filters, search);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Error Fetching Projects",
          description: "",
        });
      }
    };
    getProjects();
  }, [page, filters, search]);

  useEffect(() => {
    setFilters({
      campus: selectedCampus != "All" ? selectedCampus : undefined,
      department: selectedDepartment != "All" ? selectedDepartment : undefined,
      year: selectedYear != "All" ? selectedYear : undefined,
      category: selectedCategory != "All" ? selectedCategory : undefined,
      supervisor: selectedSupervisor != "All" ? selectedSupervisor : undefined,
    });
  }, [
    selectedCampus,
    selectedDepartment,
    selectedYear,
    selectedCategory,
    selectedSupervisor,
  ]);

  return (
    <Layout>
      <SearchWithKeywords setSearh={setSearch} />
      <div className="flex justify-end items-end gap-4 pb-8">
        <Dropdown
          trigger={"Campus"}
          list={["All", "NC", "OC"]}
          selected={selectedCampus}
          handleSelect={setSelectedCampus}
        />
        <Dropdown
          trigger={"Department"}
          list={[
            "All",
            "Computer Science",
            "Information Technology",
            "Software Engineering",
            "Data Science",
          ]}
          selected={selectedDepartment}
          handleSelect={setSelectedDepartment}
        />
        <Dropdown
          trigger={"Year"}
          list={["All", "2021", "2022", "2023", "2024", "2025"]}
          selected={selectedYear}
          handleSelect={setSelectedYear}
        />
        <Dropdown
          trigger={"Category"}
          list={updatedCategories}
          selected={selectedCategory}
          handleSelect={setSelectedCategory}
        />
        <Dropdown
          trigger={"Supervisor"}
          list={updatedSupervisors}
          selected={selectedSupervisor}
          handleSelect={setSelectedSupervisor}
        />

        <Button
          className="h-12 px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white hover:shadow-lg transition-all duration-300"
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </div>
      {isLoading ? (
        <SkeletonCard />
      ) : (
        <>
          {projectsPaginated.length == 0 ? (
            <div className="flex justify-center h-56 w-full text-xl font-semibold">
              No Projects Found
            </div>
          ) : (
            <FYPsListing
              allProjects={projectsPaginated}
              page={page}
              setPage={setPage}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default PublicFYPs;
