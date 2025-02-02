import bcrypt from "bcryptjs";

import { Project, User, TeamMember, Category } from "../models/index.js";

export const createUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  const userId = req.userId;
  try {
    if (!email || !name) {
      throw new Error("All fields are required");
    }
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
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
  const userId = req.userId;
  const upadetData = req.body;
  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const userFromDB = await User.findByIdAndUpdate(req.params.id, upadetData, {
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
  const userId = req.userId;
  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
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
  const userId = req.userId;

  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
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
  const userId = req.userId;
  try {
    const Admin = await User.findById(userId);
    if (!Admin || Admin.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const users = await User.find({ _id: { $ne: userId } });
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
  const userId = req.userId;

  try {
    if (!name) {
      throw new Error("Category name is required");
    }
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
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
  const userId = req.userId;
  try {
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
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
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
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
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
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
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
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

export const createInitialProject = async (req, res) => {
  try {
    const {
      title,
      description,
      campus,
      department,
      year,
      category,
      supervisor,
      figmaLink,
      githubLink,
      deployLink,
      thumbnail,
    } = req.body;
    const userId = req.userId;
    if (
      !title ||
      !description ||
      !campus ||
      !department ||
      !year ||
      !category ||
      !supervisor ||
      !githubLink ||
      !thumbnail
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const project = new Project({
      title,
      description,
      campus,
      department,
      year,
      category,
      supervisor,
      githubLink,
      figmaLink,
      deployLink,
      thumbnail,
      createdByAdmin: true,
      status: "Approved",
      user: user._id,
    });
    user.adminProjects.push(project._id);
    await user.save();
    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project uploaded successfully",
      projectData: {
        ...project._doc,
      },
    });
  } catch (error) {
    console.log("error in project upload");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateProject = async (req, res) => {
  try {
    const { updateData } = req.body;
    const projectId = req.params.id;
    const userId = req.userId;

    if (
      !updateData.title ||
      !updateData.description ||
      !updateData.campus ||
      !updateData.department ||
      !updateData.year ||
      !updateData.category ||
      !updateData.supervisor ||
      !updateData.githubLink
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }

    const updatedFields = {};

    for (const key in updateData) {
      if (
        key === "frontend" ||
        key === "backend" ||
        key === "aiLibraries" ||
        key === "devops" ||
        key === "testing" ||
        key === "database"
      ) {
        if (
          JSON.stringify(updateData[key]) !==
          JSON.stringify(existingProject[key])
        ) {
          updatedFields[key] = updateData[key];
        }
      } else if (updateData[key] !== existingProject[key]) {
        updatedFields[key] = updateData[key];
      }
    }
    if (Object.keys(updatedFields).length > 0) {
      updatedFields.updated_at = Date.now();
      await Project.findByIdAndUpdate(projectId, updatedFields, { new: true });
    }
    const updatedProject = await Project.findById(projectId);
    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      projectData: updatedProject,
    });
  } catch (error) {
    console.log("error in project update");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getSingleProject = async (req, res) => {
  try {
    const userId = req.userId;
    const projectId = req.params.id;

    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const project = await Project.findOne({ _id: projectId })
      .populate("teamMembers")
      .populate("user", "name");
    if (!project) {
      return res
        .status(403)
        .json({ success: false, message: "No project found" });
    }
    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      projectData: {
        ...project._doc,
      },
    });
  } catch (error) {
    console.log("error in finding single project");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteProject = async (req, res) => {
  try {
    const userId = req.userId;
    const projectId = req.params.id;

    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(403)
        .json({ success: false, message: "No project found" });
    }
    for (const memberId of project?.teamMembers) {
      await TeamMember.findByIdAndDelete(memberId);
    }
    user.project = undefined;
    if (user.adminProjects.length > 0) {
      user.adminProjects = user.adminProjects.filter(
        (id) => id.toString() !== project._id.toString()
      );
    }
    await user.save();
    const deletedProject = await Project.findByIdAndDelete(project._id);
    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
      deletedProject,
    });
  } catch (error) {
    console.log("error deleting project");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects) {
      return res
        .status(403)
        .json({ success: false, message: "No project found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      projects,
    });
  } catch (error) {
    console.log("error in finding projects");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllAdminProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdByAdmin: true });
    if (!projects) {
      return res
        .status(403)
        .json({ success: false, message: "No project found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      projects,
    });
  } catch (error) {
    console.log("error in finding admin projects");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const approveProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const approvedProject = await Project.findByIdAndUpdate(
      projectId,
      { status: "Approved" },
      { new: true }
    );
    if (!approveProject) {
      return res.status(200).json({
        success: false,
        message: "Failed to approve Project",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Project approved successfully",
      projectData: approvedProject,
    });
  } catch (error) {
    console.log("error in project approval");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const rejectProject = async (req, res) => {
  try {
    const projectId = req.params.id;
    const userId = req.userId;

    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const rejectedProject = await Project.findByIdAndUpdate(
      projectId,
      { status: "Rejected" },
      { new: true }
    );
    if (!rejectedProject) {
      return res.status(200).json({
        success: false,
        message: "Failed to reject Project",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Project rejected by Admin",
      projectData: rejectedProject,
    });
  } catch (error) {
    console.log("error in project rejection");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const addTeamMember = async (req, res) => {
  const userId = req.userId;
  const { teamMember } = req.body;
  const { projectId } = req.params;
  try {
    if (!teamMember.name || !teamMember.rollNo || !teamMember.email) {
      return res
        .status(404)
        .json({ status: false, message: "Missing required fields" });
    }
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }
    const existingTeamMember = await TeamMember.findOne({
      rollNo: teamMember.rollNo,
    });
    if (existingTeamMember) {
      return res
        .status(400)
        .json({ status: false, message: "Team member already exists" });
    }
    const newTeamMember = new TeamMember({
      ...teamMember,
      project: project._id,
    });
    await newTeamMember.save();

    project.teamMembers.push(newTeamMember._id);
    await project.save();

    return res.status(200).json({
      success: true,
      message: "Team Member Added Successfully",
      teamMember: newTeamMember,
    });
  } catch (error) {
    console.log("error creating new team member");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateTeamMember = async (req, res) => {
  const { memberId } = req.params;
  const { updateData } = req.body;
  const userId = req.userId;
  try {
    if (!memberId || !updateData) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const updatedTeamMember = await TeamMember.findOneAndUpdate(
      {
        _id: memberId,
      },
      { ...updateData },
      { new: true }
    );
    if (!updatedTeamMember) {
      return res
        .status(404)
        .json({ status: false, message: "Team member not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Team Member Updated Successfully",
      teamMember: updatedTeamMember,
    });
  } catch (error) {
    console.log("error updating team member");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteTeamMember = async (req, res) => {
  const userId = req.userId;
  const { memberId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const teamMember = await TeamMember.findById(memberId);
    if (!teamMember) {
      return res
        .status(404)
        .json({ status: false, message: "Team member not found" });
    }
    const project = await Project.findById(teamMember.project);
    if (!project) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
    }
    project.teamMembers = project.teamMembers.filter(
      (mId) => mId.toString() !== memberId.toString()
    );
    await project.save();
    await TeamMember.findByIdAndDelete(memberId);

    return res.status(200).json({
      success: true,
      message: "Team Member Deleted Successfully ",
    });
  } catch (error) {
    console.log("error deleting team member");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getTeamMember = async (req, res) => {
  const { memberId } = req.params;
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }
    const teamMember = await TeamMember.findById(memberId);
    if (!teamMember) {
      return res
        .status(404)
        .json({ status: false, message: "Team member not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Team Member Found Successfully",
      teamMember: teamMember,
    });
  } catch (error) {
    console.log("error finding team member");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllTeamMembers = async (req, res) => {
  const userId = req.userId;
  const { projectId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user || user.role != "admin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Admin Access Required",
      });
    }

    const teamMembers = await TeamMember.find({ project: projectId });

    return res.status(200).json({
      success: true,
      message: "Team Members Found Successfully",
      teamMembers: teamMembers,
    });
  } catch (error) {
    console.log("error finding team members");
    res.status(400).json({ success: false, message: error.message });
  }
};
