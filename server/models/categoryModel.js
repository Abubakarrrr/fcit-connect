import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Category name
  description: { type: String, default: null }, // Optional description of the category
});
const Category = mongoose.model("Category", CategorySchema);
export { Category };
