import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FypRow from "../../admin/fyp/FypRow";
import { useProjectStore } from "@/store/projectStore";
import { useAuthStore } from "@/store/authStore";
import { LoadingSpinner } from "@/components/shared";

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

const ListedFyp = () => {
  const { user } = useAuthStore();
  const { getSingleUserProject, project } = useProjectStore();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getP = async () => {
      setIsLoading(true);
      try {
        await getSingleUserProject(user?.project);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        // console.log(error);
      }
    };

    getP();
  }, [getSingleUserProject, user?.project]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
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
          <TableBody className="">
            {project && <FypRow project={project} />}
          </TableBody>
        </Table>
      )}
    </main>
  );
};

export default ListedFyp;
