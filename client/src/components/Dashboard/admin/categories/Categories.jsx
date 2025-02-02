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
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash, Edit2 } from "lucide-react"; // Icons from Lucide
import { useProjectStore } from "@/store/projectStore";
import { useToast } from "@/hooks/use-toast";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({ name: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    sudo_createCategory,
    sudo_updateCategory,
    sudo_getAllCategories,
    sudo_deleteCategory,
    adminCategories,
  } = useProjectStore();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await sudo_getAllCategories();
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    if (adminCategories.length > 0) {
      setCategories(adminCategories);
    }
  }, [adminCategories]);
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update category
  const handleSubmit = async () => {
    setIsLoading(true);
    if (editingCategory) {
      try {
        const updatedUser = await sudo_updateCategory(
          formData.name,
          editingCategory._id
        );
        if (updatedUser) {
          toast({
            title: "Category Updated Successfully",
            description: "",
          });
          setCategories((prev) =>
            prev.map((user) => {
              return user._id === updatedUser._id
                ? { ...editingCategory, ...formData }
                : user;
            })
          );
          setEditingCategory(null);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Error Updating Category",
          description: "",
        });
      }
    } else {
      try {
        const createdCategory = await sudo_createCategory(formData.name);
        if (createdCategory) {
          toast({
            title: "Category Added Successfully",
            description: "",
          });
          setCategories((prev) => [...prev, { ...createdCategory }]);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast({
          title: error.response?.data?.message || "Error Creating Category",
          description: "",
        });
      }
    }
    setFormData({ name: "" });
    setIsLoading(false);
  };

  // Edit category
  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingCategory(category);
  };

  // Delete category
  const handleDelete = async (id) => {
    setIsLoading(true);
    try {
      await sudo_deleteCategory(id);
      toast({
        title: "Category Deleted Successfully",
        description: "",
      });
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: error.response?.data?.message || "Error Deleting Category",
        description: "",
      });
    }
    setCategories((prev) => prev.filter((cat) => cat._id !== id));
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <Input
              name="name"
              placeholder="Category Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <Button
              onClick={handleSubmit}
              disabled={isLoading}
              className="sm:col-span-3 w-full"
            >
              {editingCategory ? "Update Category" : "Add Category"}
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length > 0 &&
                categories.map((category) => (
                  <TableRow key={category._id}>
                    <TableCell>{category.name}</TableCell>
                    <TableCell className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        disabled={isLoading}
                        onClick={() => handleEdit(category)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(category._id)}
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

export default CategoryPage;
