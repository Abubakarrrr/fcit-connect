import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Trash, Edit2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/authStore";
import { useToast } from "@/hooks/use-toast";

const UserManagementPage = () => {
  const { sudo_getAllUsers, sudo_createUser, sudo_updateUser, allUsers } =
    useAuthStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await sudo_getAllUsers();
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (allUsers.length > 0) {
      setUsers(allUsers);
    }
  }, [allUsers]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  // Add or update user
  const handleSubmit = async () => {
    setIsLoading(true);
    if (editingUser) {
      try {
        const updatedUser = await sudo_updateUser(formData, editingUser._id);
        if (updatedUser) {
          toast({
            title: "User Updated Successfully",
            description: "",
          });
          setUsers((prev) =>
            prev.map((user) => {
              return user._id === updatedUser._id
                ? { ...editingUser, ...formData }
                : user;
            })
          );
          setEditingUser(null);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Error Updating User",
          description: "",
        });
      }
    } else {
      try {
        const createdUser = await sudo_createUser(formData);
        if (createdUser) {
          toast({
            title: "User Added Successfully",
            description: "",
          });
          setUsers((prev) => [...prev, { ...createdUser }]);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Error Creating User",
          description: "",
        });
      }
    }
    setFormData({ name: "", email: "", role: "user" });
  };

  // Edit user
  const handleEdit = (user) => {
    setFormData({ name: user.name, email: user.email, role: user.role });
    setEditingUser(user);
  };

  // Delete user
  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((user) => user._id !== id));
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
              <option value="user">User</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </select>
            <Button onClick={handleSubmit} disabled={isLoading} className="sm:col-span-3 w-full">
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
              {users.length > 0 &&
                users.map((user) => (
                  <TableRow key={user._id}>
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
            Showing{" "}
            <strong>
              {users.length} of <strong>1-10</strong>{" "}
            </strong>{" "}
            users
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserManagementPage;
