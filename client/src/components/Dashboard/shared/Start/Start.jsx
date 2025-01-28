import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { PlusCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Start = () => {
  const { user } = useAuthStore();
  const dashboardLink =
    user?.role === "admin" ? "/admin/fyps/new" : "/user/fyps/new";

  return (
    <div className="flex flex-col mx-auto justify-center gap-2">
      {user?.project && (
        <div className="flex flex-col items-center gap-2">
          <h3 className="text-2xl font-bold tracking-tight">FYP already uploaded</h3>
          <Link to="/user/listedfyp">
          <Button >
            See your FYP
          </Button>
          </Link>
        </div>
      )}
      {!user?.project && (
        <div className="flex flex-col  items-center gap-2">
          <h3 className="text-2xl font-bold tracking-tight">
            {user?.role === "admin"
              ? "Admin Dashboard - Manage FYPs"
              : "User Dashboard - Add FYP"}
          </h3>
          <Link to={dashboardLink}>
            <Button size="" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add FYP</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Start;
