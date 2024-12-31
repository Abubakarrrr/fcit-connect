import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trash, Edit2 } from "lucide-react";

const SupervisorPage = () => {
  const [supervisors, setSupervisors] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      department: "Computer Science",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      department: "Electrical Engineering",
    },
  ]);
  const [formData, setFormData] = useState({ name: "", email: "", department: "" });
  const [editingSupervisor, setEditingSupervisor] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update supervisor
  const handleSubmit = () => {
    if (editingSupervisor) {
      setSupervisors((prev) =>
        prev.map((sup) =>
          sup.id === editingSupervisor.id ? { ...editingSupervisor, ...formData } : sup
        )
      );
      setEditingSupervisor(null);
    } else {
      setSupervisors((prev) => [
        ...prev,
        { id: Date.now(), ...formData },
      ]);
    }
    setFormData({ name: "", email: "", department: "" });
  };

  // Edit supervisor
  const handleEdit = (supervisor) => {
    setFormData({ name: supervisor.name, email: supervisor.email, department: supervisor.department });
    setEditingSupervisor(supervisor);
  };

  // Delete supervisor
  const handleDelete = (id) => {
    setSupervisors((prev) => prev.filter((sup) => sup.id !== id));
  };

  // Function to get initials from name
  const getInitials = (name) => {
    const nameParts = name.split(" ");
    return nameParts
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Supervisors Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input
              name="name"
              placeholder="Supervisor Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Supervisor Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input
              name="department"
              placeholder="Department"
              value={formData.department}
              onChange={handleInputChange}
            />
            <Button onClick={handleSubmit} className="sm:col-span-3 w-full">
              {editingSupervisor ? "Update Supervisor" : "Add Supervisor"}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden sm:table-cell">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supervisors.map((supervisor) => (
                <TableRow key={supervisor.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Avatar className="">
                      <AvatarFallback className="text-lg font-bold bg-primary text-primary-foreground">{getInitials(supervisor.name)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>{supervisor.name}</TableCell>
                  <TableCell>{supervisor.email}</TableCell>
                  <TableCell>{supervisor.department}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(supervisor)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(supervisor.id)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupervisorPage;
