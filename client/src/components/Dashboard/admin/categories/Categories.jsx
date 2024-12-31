import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Trash, Edit2 } from "lucide-react"; // Icons from Lucide

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "AI and Machine Learning" },
    { id: 2, name: "Web Development" },
    { id: 3, name: "Data Science" },
  ]);
  const [formData, setFormData] = useState({ name: "" });
  const [editingCategory, setEditingCategory] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update category
  const handleSubmit = () => {
    if (editingCategory) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingCategory.id ? { ...editingCategory, ...formData } : cat
        )
      );
      setEditingCategory(null);
    } else {
      setCategories((prev) => [
        ...prev,
        { id: Date.now(), ...formData },
      ]);
    }
    setFormData({ name: "" });
  };

  // Edit category
  const handleEdit = (category) => {
    setFormData({ name: category.name });
    setEditingCategory(category);
  };

  // Delete category
  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
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
            <Button onClick={handleSubmit} className="sm:col-span-3 w-full">
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
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleEdit(category)}
                    >
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDelete(category.id)}
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
