import { Project, User, TeamMember } from "../models/index.js";

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
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ error: "Unothorized: No user found" });
    }
    if (user.project) {
      return res.status(403).json({ error: "User has already a project" });
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
        .json({ status: false, message: "Missing required fields" });
    }

    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return res
        .status(404)
        .json({ status: false, message: "Project not found" });
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
      projectData: "updatedProject",
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
      return res.status(403).json({ error: "Forbidden: No user found" });
    }
    const project = await Project.findOne({ user: user._id });
    if (!project || project._id != projectId) {
      return res.status(403).json({ error: "No project found for the user" });
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
      return res.status(403).json({ error: "Forbidden: No user found" });
    }
    const project = await Project.findOne({ user: user._id });
    if (!project || project._id != projectId) {
      return res.status(403).json({ error: "No project found for the user" });
    }
    for (const memberId of project.teamMembers) {
      await TeamMember.findByIdAndDelete(memberId);
    }
    user.teamMembers = undefined;
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
export const getSingleProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await Project.findById(id);
    if (!project) {
      return res.status(403).json({ error: "No project found" });
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
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    if (!projects) {
      return res.status(403).json({ error: "No project found" });
    }

    return res.status(200).json({
      success: true,
      message: "Project found successfully",
      projects,
    });
  } catch (error) {
    console.log("error in finding single project");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const addTeamMember = async (req, res) => {
  const userId = req.userId;
  const { teamMember, projectId } = req.body;
  try {
    if (!teamMember.name || !teamMember.rollNo || !teamMember.email) {
      return res.status(404).json({ message: "Missing required fields" });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const existingTeamMember = await TeamMember.findOne({
      rollNo: teamMember.rollNo,
    });
    if (existingTeamMember) {
      return res.status(400).json({ message: "Team member already exists" });
    }
    const newTeamMember = new TeamMember({
      ...teamMember,
      project: project._id,
      teamLeader: user._id,
    });
    await newTeamMember.save();

    user.teamMembers.push(newTeamMember._id);
    project.teamMembers.push(newTeamMember._id);
    await user.save();
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
  const teamMemberId = req.params.id;
  const { updateData } = req.body;
  try {
    if (!teamMemberId || !updateData) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid input data" });
    }
    const updatedTeamMember = await TeamMember.findOneAndUpdate(
      {
        _id: teamMemberId,
      },
      { ...updateData },
      { new: true }
    );
    if (!updatedTeamMember) {
      return res.status(404).json({ message: "Team member not found" });
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
  const teamMemberId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const teamMember = await TeamMember.findById(teamMemberId);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    const project = await Project.findById(teamMember.project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    user.teamMembers = user.teamMembers.filter(
      (mId) => mId.toString() !== teamMemberId.toString()
    );
    project.teamMembers = project.teamMembers.filter(
      (mId) => mId.toString() !== teamMemberId.toString()
    );

    await user.save();
    await project.save();

    await TeamMember.findByIdAndDelete(teamMemberId);

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
  const teamMemberId = req.params.id;
  try {
    const teamMember = await TeamMember.findById(teamMemberId);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
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
  try {
    const teamMembers = await TeamMember.find({ teamLeader: userId });

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
      return res.status(404).json({ message: "Project not found" });
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
      return res.status(404).json({ message: "File type not found" });
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
      return res.status(404).json({ message: "Project not found" });
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
      return res.status(404).json({ message: "File type not found" });
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
