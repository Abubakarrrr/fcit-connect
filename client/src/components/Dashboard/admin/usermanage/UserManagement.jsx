import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Trash, Edit2 } from "lucide-react" 
import { Avatar } from "@/components/ui/avatar";

const UserManagementPage = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Abubakar Amjad", email: "abubakar@example.com", role: "Admin" },
    { id: 2, name: "Sarah Khan", email: "sarah@example.com", role: "Supervisor" },
    { id: 3, name: "John Doe", email: "john@example.com", role: "Student" },
  ]);

  const [formData, setFormData] = useState({ name: "", email: "", role: "Student" });
  const [editingUser, setEditingUser] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update user
  const handleSubmit = () => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editingUser.id ? { ...editingUser, ...formData } : user
        )
      );
      setEditingUser(null);
    } else {
      setUsers((prev) => [...prev, { id: Date.now(), ...formData }]);
    }
    setFormData({ name: "", email: "", role: "Student" });
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingUser(user);
  };

  // Delete user
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // Helper function to get user initials
  const getInitials = (name) => {
    const nameArray = name.split(" ");
    const firstInitial = nameArray[0]?.[0] || "";
    const lastInitial = nameArray[1]?.[0] || "";
    return `${firstInitial}${lastInitial}`.toUpperCase();
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
            <select
              name="role"
              className="w-full px-2 outline-none rounded-md border bg-white shadow-sm focus:ring-2 focus:ring-gray-500"
              value={formData.role}
              onChange={handleInputChange}
            >
              <option value="Student">Student</option>
              <option value="Supervisor">Supervisor</option>
              <option value="Admin">Admin</option>
            </select>
            <Button onClick={handleSubmit} className="sm:col-span-3 w-full">
              {editingUser ? "Update User" : "Add User"}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Avatar className="h-10 w-10 bg-black text-white flex items-center justify-center text-xs font-semibold">
                      {getInitials(user.name)}
                    </Avatar>
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(user)}
                    >
                      <Edit2 className="w-4 h-4 text-yellow-500" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash className="w-4 h-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{users.length} of <strong>1-10</strong> </strong> users
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserManagementPage;
