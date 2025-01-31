import React from "react";
import { File, ListFilter, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fypProjectsData } from "@/components/shared/fypProjectsData";
import FypTable from "./FypTable";
import { Link } from "react-router-dom";

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

const Fyps = () => {
  const approved = fypProjectsData.filter((fyp) => fyp.status === "Approved");
  const pending = fypProjectsData.filter((fyp) => fyp.status === "Pending");
  const rejected = fypProjectsData.filter((fyp) => fyp.status === "Rejected");
  return (
    <main className="flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      {/* <div className="w-max ml-auto flex-1 my-3 md:grow-0">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
        />
      </div> */}

      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="rejected" className="">
              Rejected
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-7 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Approved
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Pending</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Rejected</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <Button size="sm" variant="outline" className="h-7 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button> */}
            <Link to="/admin/dashboard">
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add FYP
                </span>
              </Button>
            </Link>
          </div>
        </div>

        <FypTable
          value="all"
          cardTitle="All FYPs"
          cardDescription="Manage approved FYPs"
          tableHeaders={tableHeaders}
          fypProjectsArray={fypProjectsData}
        />
        <FypTable
          value="approved"
          cardTitle="Approved FYPs"
          cardDescription="Manage approved FYPs"
          tableHeaders={tableHeaders}
          fypProjectsArray={approved}
        />
        <FypTable
          value="rejected"
          cardTitle="Rejected FYPs"
          cardDescription="Manage approved FYPs"
          tableHeaders={tableHeaders}
          fypProjectsArray={rejected}
        />
        <FypTable
          value="pending"
          cardTitle="Pending FYPs"
          cardDescription="Manage approved FYPs"
          tableHeaders={tableHeaders}
          fypProjectsArray={pending}
        />
      </Tabs>
    </main>
  );
};

export default Fyps;
