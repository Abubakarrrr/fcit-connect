import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FypRow from "../../admin/fyp/FypRow";
import { useLocation } from "react-router-dom";
import { useProjectStore } from "@/store/projectStore";
import { useAuthStore } from "@/store/authStore";

const tableHeaders = [
  {
    content: <span className="">Image</span>,
    className: "hidden w-[100px] sm:table-cell",
  },
  { content: "Name" },
  { content: "Status" },
  { content: "Uploaded at", className: "hidden md:table-cell" },
  { content: <span className="sr-only">Actions</span> },
];

const fypProjectData = [
  //  Example FYP data. Leave this array empty to test the "No FYPs yet" functionality.
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
    status: "approved",
    link: "/fyps/2023/smart-waste-management-system/1",
    uploadedAt: "2023-07-12 10:42 AM",
  },
];

const ListedFyp = () => {
  const { user } = useAuthStore();
  const { getSingleUserProject, project } = useProjectStore();
  useEffect(() => {
    const getP = async () => {
      await getSingleUserProject(user?.project);
      console.log(project);
    };
    getP();
  }, []);
  return (
    <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {!project ? (
        <div className="flex items-center justify-center h-64">
          <h2 className="text-2xl font-semibold ">No FYPs yet</h2>
        </div>
      ) : (
        <Table className="w-full border">
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead key={index} className={header.className || ""}>
                  {header.content}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="">{project && <FypRow project={project} />}</TableBody>
        </Table>
      )}
    </main>
  );
};

export default ListedFyp;
