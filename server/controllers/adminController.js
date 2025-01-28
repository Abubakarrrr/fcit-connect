import bcrypt from "bcryptjs";
import crypto from "crypto";

import { User, Project, Category } from "../models/index.js";

export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email: email });

    if (userAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User with this email is already registered",
      });
    }

    const hashedPassword = await bcrypt.hash(password || "fcit", 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
      isVerified: true,
      role: role || "user",
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in registering user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateUser = async (req, res) => {
  try {
    const userFromDB = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!userFromDB) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: {
        ...userFromDB._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in updating user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in deleting user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in finding user");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User found successfully",
      users,
    });
  } catch (error) {
    console.log("error in finding users");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      throw new Error("Category name is required");
    }
    const categoryFromDB = await Category.findOne({ name: name });

    if (categoryFromDB) {
      return res.status(400).json({
        success: false,
        message: "Category already added",
      });
    }

    const category = new Category({
      name,
    });

    await category.save();

    res.status(200).json({
      success: true,
      message: "Category created successfully",
      category: {
        ...category._doc,
      },
    });
  } catch (error) {
    console.log("error in creating category");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const categoryFromDB = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      {
        new: true,
      }
    );
    if (!categoryFromDB) {
      return res.status(400).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      category: categoryFromDB,
    });
  } catch (error) {
    console.log("error in updating category");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("error in deleting category");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Category found successfully",
      category,
    });
  } catch (error) {
    console.log("error in finding category");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res.status(404).json({
        success: false,
        message: "Categories not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Categories found successfully",
      categories,
    });
  } catch (error) {
    console.log("error in finding categories");
    res.status(400).json({ success: false, message: error.message });
  }
};
