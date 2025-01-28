import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";
export default function AvatarDropdown() {
  const { user, logout } = useAuthStore();
  const { toast } = useToast();
  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout successfully",
        description: "",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Logout failed",
        description: "",
      });
    }
  };
  const dashboardLink =
    user?.role === "admin" ? "/admin/dashboard" : "/user/dashboard";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={user?.profilePicture} alt="@shadcn" />
          <AvatarFallback>
            {" "}
            {user?.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Link to={dashboardLink}>Dashboard</Link>
        </DropdownMenuItem>
        <Link to="/profile">
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
