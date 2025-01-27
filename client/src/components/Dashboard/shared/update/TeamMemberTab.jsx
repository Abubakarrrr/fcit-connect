import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectStore } from "@/store/projectStore";
import { useToast } from "@/hooks/use-toast";
export default function TeamMemberTab({ members, setMembers }) {
  const { toast } = useToast();
  const {
    project,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    isLoading,
  } = useProjectStore();
  const [currentMember, setCurrentMember] = useState({
    name: "",
    rollNo: "",
    email: "",
    role: "",
    github: "",
    linkedin: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  // const [deleteId, setDeleteId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentMember({ ...currentMember, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let newTeamMember;
      newTeamMember = await addTeamMember(currentMember, project?._id);
      if (newTeamMember) {
        setMembers((prev) => {
          return [...prev, newTeamMember];
        });
        setCurrentMember({
          name: "",
          rollNo: "",
          email: "",
          role: "",
          github: "",
          linkedin: "",
        });
        toast({
          title: "Member added successfully",
          description: "",
        });
      }
    } catch (error) {
      toast({
        title: error?.response?.data.message || "Error while adding member",
        description: "",
      });
    }
  };

  const handleEdit = async(member) => {
    setIsEditing(true);
    setCurrentMember(member);
    setMembers((prevMembers) =>
      prevMembers.filter((m) => m._id !== member._id)
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let newTeamMember;
      newTeamMember = await updateTeamMember(currentMember, currentMember._id);
      if (newTeamMember) {
        setMembers((prev) => {
          return [...prev, newTeamMember];
        });
        setCurrentMember({
          name: "",
          rollNo: "",
          email: "",
          role: "",
          github: "",
          linkedin: "",
        });
        toast({
          title: "Member updated successfully",
          description: "",
        });
      }
      setIsEditing(false);
    } catch (error) {
      console.log(error)
      toast({
        title: error?.response?.data.message || "Error while updating member",
        description: "",
      });
    }
  };

  const handleDelete = async (member) => {
    try {
      await deleteTeamMember(member._id);
      setMembers((prevMembers) =>
        prevMembers.filter((m) => m._id !== member._id)
      );
      toast({
        title: "Member deleted successfully",
        description: "",
      });
    } catch (error) {
      toast({
        title: error?.response?.data?.message || "Error while deleting member",
        description: "",
      });
    }
  };
  return (
    <div className="container mx-auto p-4">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>
            {isEditing ? "Edit Team Member" : "Add Team Member"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={currentMember.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo">Roll No</Label>
                <Input
                  id="rollNo"
                  name="rollNo"
                  value={currentMember.rollNo}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={currentMember.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  name="role"
                  value={currentMember.role}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  name="github"
                  value={currentMember.github}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  value={currentMember.linkedin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button type="submit"  onClick={isEditing ? handleUpdate : handleSubmit}disabled={isLoading}>
            {isLoading
              ? "Uploading..."
              : isEditing
              ? "Update Team Member"
              : "Add Team Member"}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Roll No</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>GitHub</TableHead>
                <TableHead>LinkedIn</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members?.length > 0 &&
                members?.map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.rollNo}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          LinkedIn
                        </a>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(member)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
