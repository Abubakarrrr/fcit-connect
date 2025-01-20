import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Start = () => {
  const location = useLocation();
  const [isUserRoute, setIsUserRoute] = useState(false);
  const [isAdminRoute, setIsAdminRoute] = useState(false);

  useEffect(() => {
    // Update states based on the current route
    setIsUserRoute(location.pathname.startsWith("/user"));
    setIsAdminRoute(location.pathname.startsWith("/admin"));
  }, [location.pathname]);

  return (
    <div className="flex flex-col mx-auto justify-center gap-2">
      <div className="flex flex-col  items-center gap-2">
        <h3 className="text-2xl font-bold tracking-tight">
          {isAdminRoute
            ? "Admin Dashboard - Manage FYPs"
            : "User Dashboard - Add FYP"}
        </h3>
        {isUserRoute && (
          <Link to="/user/fyps/new">
            <Button size="" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add Your FYP</span>
            </Button>
          </Link>
        )}
        {isAdminRoute && (
          <Link to="/admin/fyps/new">
            <Button size="" className="gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span>Add FYP</span>
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Start;
