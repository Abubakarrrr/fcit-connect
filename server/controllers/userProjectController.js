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
      !githubLink
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    if (!userId) {
      return res.status(400).json({
        status: false,
        messaage: "Unothorized - No user found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ error: "Forbidden: No user found" });
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
    const updateData = req.body;
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
      return res.status(400).json({ error: "Missing required fields" });
    }

    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    const updatedFields = {};

    for (const key in updateData) {
      if (
        key === "frontend" ||
        key === "backend" ||
        key === "aiLibraries" ||
        key === "devops" ||
        key === "testing"
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

    res.status(200).json({
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

    if (!userId) {
      return res.status(400).json({
        status: false,
        messaage: "Unothorized - No user found",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ error: "Forbidden: No user found" });
    }
    const project = await Project.findOne({ user: user._id });
    if (!project) {
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
export const getSingleProject = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await Project.findById(projectId);
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
  const { name, rollNo, email, role, github, linkedIn } = req.body;
  // console.log(name,rollNo,email,role,github,linkedIn);
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingTeamMember = await TeamMember.findOne({ rollNo });
    if (existingTeamMember) {
      return res.status(400).json({ message: "Team member already exists" });
    }
    const newTeamMember = new TeamMember({
      name,
      rollNo,
      email,
      role: role || null,
      github: github || null,
      linkedIn: linkedIn || null,
      project: user.project,
      teamLeader: userId,
    });
    await newTeamMember.save();

    user.teamMembers.push(newTeamMember._id);
    await user.save();

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

    user.teamMembers.pull(teamMemberId);
    await user.save();

    await TeamMember.findByIdAndDelete(teamMemberId);

    return res.status(200).json({
      success: true,
      message: "Team Member Deleted Successfully",
    });
  } catch (error) {
    console.log("error deleting team member");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const updateTeamMember = async (req, res) => {
  const teamMemberId = req.params.id;
  const updateData = req.body;
  try {
    const existingTeamMember = await TeamMember.findById(teamMemberId);
    if (!existingTeamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    const updatedFields = {};

    for (const key in updateData) {
      if (updateData[key] !== existingTeamMember[key]) {
        updatedFields[key] = updateData[key];
      }
    }
    if (Object.keys(updatedFields).length > 0) {
      await TeamMember.findByIdAndUpdate(teamMemberId, updatedFields, {
        new: true,
      });
    }

    const updatedTeamMember = await TeamMember.findById(teamMemberId);

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
