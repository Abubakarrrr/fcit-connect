import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { useAuthStore } from "@/store/authStore";
import { useProjectStore } from "@/store/projectStore";
import { MoreHorizontal, Pencil, Trash, Check } from "lucide-react";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

const FypAdminRow = ({ project }) => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { sudo_deleteProject } = useProjectStore();
  const { thumbnail, title, status, updated_at, _id } = project;
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const dateObject = new Date(updated_at);
  const formattedDate = dateObject.toISOString().split("T")[0];
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id) => {
    try {
      setIsDeleting(true);
      await sudo_deleteProject(id);
      setIsDeleting(false);
      toast({
        title: "Fyp deleted successfully",
        description: "",
      });
    } catch (error) {
      setIsDeleting(false);
      console.error("Error deleting FYP:", error);
      toast({
        title: "Error deleting FYP",
        description: "",
      });
    }
  };
  if (!project) {
    return <div>No FYP Found</div>;
  }
  return (
    <tr>
      {/* Image Cell */}
      <td className="hidden sm:table-cell p-2">
        <img
          alt="image"
          className="aspect-square rounded-md object-cover"
          height="48"
          src={thumbnail || "/placeholder.svg"}
          width="48"
        />
      </td>

      {/* Name Cell */}
      <td className="font-medium hover:underline underline-offset-2">
        <Link to={`/admin/fyps/${_id}`} target="_blank" rel="noopener noreferrer">{title}</Link>
      </td>
      {/* Status Cell */}
      <td>
        <Badge variant="outline">{status}</Badge>
      </td>

      {/* Uploaded At Cell */}
      <td className="hidden md:table-cell">{formattedDate} </td>

      {/* Actions Cell */}
      <td>
        {isDeleting ? (
          <p className="text-gray-500">deleting...</p>
        ) : (
          <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
            <DropdownMenuTrigger asChild>
              <Button aria-haspopup="true" size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              {/* Edit Option */}
              <DropdownMenuItem asChild>
                <Link
                  to={`/admin/fyps/update/${_id}`}
                  className="flex items-center gap-2"
                >
                  <Pencil className="h-4 w-4 text-gray-400" />
                  <span>Edit</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setOpenDropdown(false);
                  setTimeout(() => setOpenDialog(true), 100);
                }}
              >
                <div className="flex items-center gap-2">
                  <Trash className="h-4 w-4 text-red-500" />
                  <span>Delete</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete the project?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button
                disabled={isDeleting}
                variant="destructive"
                onClick={() => {
                  handleDelete(_id);
                  setOpenDialog(false);
                }}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </td>
    </tr>
  );
};

export default FypAdminRow;
