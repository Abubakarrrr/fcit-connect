import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pencil, Trash, Check } from "lucide-react";
import { RxCross1 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const FypRow = ({ data }) => {
  const { image, name, status, uploadedAt, link } = data;
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <tr>
      {/* Image Cell */}
      <td className="hidden sm:table-cell">
        <img
          alt={`image`}
          className="aspect-square rounded-md object-cover"
          height="64"
          src={image || "/placeholder.svg"}
          width="64"
        />
      </td>

      {/* Name Cell */}
      <td className="font-medium">{name}</td>

      {/* Status Cell */}
      <td>
        <Badge variant="outline">{status}</Badge>
      </td>

      {/* Uploaded At Cell */}
      <td className="hidden md:table-cell">{uploadedAt}</td>

      {/* Actions Cell */}
      <td>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <Pencil className="h-4 w-4 text-gray-400" />
                <span>Edit</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex items-center gap-2">
                <Trash className="h-4 w-4 text-red-500" />
                <span>Delete</span>
              </div>
            </DropdownMenuItem>
            {isAdminRoute && (
              <div>
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
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
};

export default FypRow;
