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
import { useProjectStore } from "@/store/projectStore";
import { MoreHorizontal, Pencil, Trash, Check } from "lucide-react";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { Link, useLocation } from "react-router-dom";

const FypRow = ({ project }) => {
  if (!project) {
    return <div>No fyp</div>;
  }
  const {toast}=useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const {deleteProject}=useProjectStore();
  const { thumbnail, title, status, updated_at, _id } = project;
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const dateObject = new Date(updated_at);
  const formattedDate = dateObject.toISOString().split("T")[0];

  const handleDelete = async (id) => {
    try {
      await deleteProject(id);
      toast({
        title: "Fyp deleted successfully",
        description: "",
      });
    } catch (error) {
      console.error("Error deleting fyp:", error);
      toast({
        title: "Error deleting fyp",
        description: "",
      });
    }
  };

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
        <Link to={`/user/fyps/update/${_id}`}>{title}</Link>
      </td>

      {/* Status Cell */}
      <td>
        <Badge variant="outline">{status}</Badge>
      </td>

      {/* Uploaded At Cell */}
      <td className="hidden md:table-cell">{formattedDate}</td>

      {/* Actions Cell */}
      <td>
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
                to={`/user/fyps/update/${_id}`}
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

            {/* Admin Actions */}
            {isAdminRoute && (
              <>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span>Approve</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <RxCross1 className="h-4 w-4 text-red-400" />
                    <span>Reject</span>
                  </div>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

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

export default FypRow;
