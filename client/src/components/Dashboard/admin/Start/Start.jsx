import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <h3 className="text-2xl font-bold tracking-tight">Add FYPs</h3>
      <Link to="/admin/fyps/new">
        <Button size="" className="gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="">
            Add FYP
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default Start;
