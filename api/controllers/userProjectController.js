import axios from "axios";
import { Project, User, TeamMember, Category } from "../models/index.js";

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
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: No user found" });
    }
    if (user.project) {
      return res
        .status(403)
        .json({ success: false, message: "User has already a project" });
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
      user: user._id,
    });
    user.project = project._id;
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
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Unauthorized: No user found" });
    }
    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    if (existingProject.user.toString() != user._id.toString()) {
      return res.status(404).json({
        success: false,
        message: "Unauthorized project update action",
      });
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
      await Project.findByIdAndUpdate(
        projectId,
        { ...updatedFields, status: "Pending" },
        { new: true }
      );
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
export const getSingleUserProject = async (req, res) => {
  try {
    const userId = req.userId;
    const projectId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: No user found" });
    }
    const project = await Project.findOne({ user: user._id })
      .populate("teamMembers")
      .populate("user", "name");
    if (!project || project._id != projectId) {
      return res
        .status(403)
        .json({ success: false, message: "No project found for the user" });
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
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: No user found" });
    }
    const project = await Project.findOne({ user: user._id });
    if (!project || project._id != projectId) {
      return res
        .status(403)
        .json({ success: false, message: "No project found for the user" });
    }
    for (const memberId of project.teamMembers) {
      await TeamMember.findByIdAndDelete(memberId);
    }
    user.project = undefined;
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

export const likeProject = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: No user found" });
    }
    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(403)
        .json({ success: false, message: "Failed to like, no project found" });
    }

    project.likes.push(user._id);
    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project Liked",
    });
  } catch (error) {
    console.log("error in liking project");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const unLikeProject = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById(req.userId);
    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: "Forbidden: No user found" });
    }

    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "No project found to unlike" });
    }

    // Remove user ID from likes array if present
    project.likes = project.likes.filter(
      (userId) => userId.toString() !== user._id.toString()
    );

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project unliked successfully",
    });
  } catch (error) {
    console.error("Error unliking project:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};


export const getSingleProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findByIdAndUpdate(
      id,
      { $inc: { views: 1 } },
      { new: true }
    )
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
export const getTop10Projects = async (req, res) => {
  try {
    const projects = await Project.find({ status: { $ne: "Rejected" } })
      .sort({ likes: -1 })
      .limit(10)
      .populate("teamMembers")
      .populate("user", "name");

    if (!projects) {
      return res
        .status(403)
        .json({ success: false, message: "No projects found" });
    }

    return res.status(200).json({
      success: true,
      message: "Top 10 Projects found successfully",
      projects,
    });
  } catch (error) {
    console.log("error in finding single project");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ status: { $ne: "Rejected" } });
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

export const getAllProjectsPage = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", ...queryFilters } = req.query;

    const filter = {
      status: { $ne: "Rejected" }, // Exclude rejected projects
    };

    // Add dynamic filters
    for (const key in queryFilters) {
      if (queryFilters[key] !== undefined && queryFilters[key] !== "") {
        filter[key] = queryFilters[key];
      }
    }

    // Search filter
    if (search && search.trim() !== "") {
      const regex = new RegExp(search.trim(), "i"); // case-insensitive
      filter.$or = [
        { title: regex },
        { description: regex },
        { campus: regex },
        { department: regex },
        { year: regex },
        { category: regex },
        { supervisor: regex },
        { githubLink: regex },
        { figmaLink: regex },
        { deployLink: regex },
        { readme: regex },
        { feedback: regex },
        { frontend: regex },
        { backend: regex },
        { database: regex },
        { aiLibraries: regex },
        { devops: regex },
        { testing: regex },
      ];
    }

    const skip = (page - 1) * limit;

    const projects = await Project.find(filter)
      .skip(skip)
      .limit(parseInt(limit));

    const totalProjects = await Project.countDocuments(filter);

    if (!projects || projects.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No project found" });
    }

    return res.status(200).json({
      success: true,
      message: "Projects found successfully",
      projects,
      pagination: {
        total: totalProjects,
        page: parseInt(page),
        pages: Math.ceil(totalProjects / limit),
      },
    });
  } catch (error) {
    console.error("Error in finding projects:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllEmbeddingProjects = async (req, res) => {
  try {
    const projects = await Project.find(
      {},
      "_id title description category campus year supervisor frontend backend database aiLibraries devops testing readme"
    );

    if (!projects || projects.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No project found" });
    }

    try {
      // Send projects array to the embedding API
      const response = await axios.post(
        "http://127.0.0.1:8000/generate-embeddings",
        projects,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return res.status(200).json({
        success: true,
        message: "Embedding created and synced",
      });
    } catch (error) {
      console.error("Error fetching embeddings:", error);
      return res.status(500).json({
        success: false,
        message: "Error in embedding generation",
        error: error.message,
      });
    }
  } catch (error) {
    console.log("Error in finding projects:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
// export const searchProjects = async (req, res) => {
//   try {
//     const { query } = req.query;

//     if (!query) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Search query is required" });
//     }

//     const regex = new RegExp(query, "i");

//     const projects = await Project.find({
//       $or: [
//         { title: regex },
//         { description: regex },
//         { campus: regex },
//         { department: regex },
//         { year: regex },
//         { category: regex },
//         { supervisor: regex },
//         { githubLink: regex },
//         { figmaLink: regex },
//         { deployLink: regex },
//         { readme: regex },
//         { feedback: regex },
//         { frontend: regex },
//         { backend: regex },
//         { database: regex },
//         { aiLibraries: regex },
//         { devops: regex },
//         { testing: regex },
//       ],
//       status: { $ne: "Rejected" },
//     });

//     if (!projects || projects.length === 0) {
//       return res
//         .status(200)
//         .json({ success: false, message: "No projects found" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Projects found successfully",
//       projects,
//     });
//   } catch (error) {
//     console.error("Error searching projects:", error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };
export const getStatistics = async (req, res) => {
  try {
    // Count total number of users
    const totalUsers = await User.countDocuments();

    // Count total number of projects
    const totalProjects = await Project.countDocuments();

    // Aggregate total likes (length of likes array) and total views
    const [likesAndViews] = await Project.aggregate([
      {
        $project: {
          views: 1,
          likesCount: { $size: "$likes" },
        },
      },
      {
        $group: {
          _id: null,
          totalLikes: { $sum: "$likesCount" },
          totalViews: { $sum: "$views" },
        },
      },
    ]);

    const statistics = {
      totalUsers,
      totalProjects,
      totalViews: likesAndViews ? likesAndViews.totalViews : 0,
      totalLikes: likesAndViews ? likesAndViews.totalLikes : 0,
    };

    return res.status(200).json({
      success: true,
      message: "Statistics retrieved successfully",
      statistics,
    });
  } catch (error) {
    console.error("Error retrieving statistics:", error);
    res.status(500).json({ success: false, message: error.message });
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
        .json({ success: false, message: "Missing required fields" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    const existingTeamMember = await TeamMember.findOne({
      rollNo: teamMember.rollNo,
    });
    if (existingTeamMember) {
      return res
        .status(400)
        .json({ success: false, message: "Team member already exists" });
    }
    const newTeamMember = new TeamMember({
      ...teamMember,
      project: project._id,
      teamLeader: user._id,
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
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
        .json({ success: false, message: "Team member not found" });
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
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const teamMember = await TeamMember.findById(memberId);
    if (!teamMember) {
      return res
        .status(404)
        .json({ success: false, message: "Team member not found" });
    }
    const project = await Project.findById(teamMember.project);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
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
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const teamMember = await TeamMember.findById(memberId);
    if (!teamMember) {
      return res
        .status(404)
        .json({ success: false, message: "Team member not found" });
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
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
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
export const uploadFile = async (req, res) => {
  const projectId = req.params.id;
  const { fileUrl, type } = req.body;

  try {
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    if (type === "THUMBNAIL") {
      project.thumbnail = fileUrl;
    } else if (type === "DOCUMENTATION") {
      project.documentation = fileUrl;
    } else if (type === "SCREENSHOT") {
      if (project.images.length < 3) {
        project.images.push(fileUrl);
      } else {
        throw new Error("Can't upload more than 3 screenshots");
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "File type not found" });
    }
    await project.save();
    return res.status(200).json({
      success: true,
      message: "file uploaded successfully",
      fileUrl: fileUrl,
    });
  } catch (error) {
    console.log("error in uploading file");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const deleteFile = async (req, res) => {
  const projectId = req.params.id;
  const { fileUrl, type } = req.body;
  try {
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    if (type === "THUMBNAIL") {
      if (project.thumbnail == fileUrl) {
        project.thumbnail = null;
      } else {
        throw new Error("Invalid file access");
      }
    } else if (type === "DOCUMENTATION") {
      if (project.documentation == fileUrl) {
        project.documentation = null;
      } else {
        throw new Error("Invalid file access");
      }
    } else if (type === "SCREENSHOT") {
      if (project.images.length > 0) {
        project.images = project.images.filter((image) => image !== fileUrl);
      } else {
        throw new Error("Can't delete screenshots");
      }
    } else {
      return res
        .status(404)
        .json({ success: false, message: "File type not found" });
    }

    await project.save();
    return res.status(200).json({
      success: true,
      message: "file deleted successfully",
    });
  } catch (error) {
    console.log("error in deleting file");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    const categoryNames = categories.map((category) => category.name);
    return res.status(200).json({
      success: true,
      message: "Categories Found Successfully",
      categories: categoryNames,
    });
  } catch (error) {
    console.log("error finding team members");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getAllSupervisors = async (req, res) => {
  try {
    const supervisors = await User.find({ role: "supervisor" }).select("name");
    const supervisorNames = supervisors.map((supervisor) => supervisor.name);

    return res.status(200).json({
      success: true,
      message: "Supervisors Found Successfully",
      supervisorNames,
    });
  } catch (error) {
    console.log("error finding team members");
    res.status(400).json({ success: false, message: error.message });
  }
};
