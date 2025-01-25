import { Project, User } from "../models/index.js";

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
    const projectId = req.params.projectId;

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

export const uploadProject = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      campus,
      department,
      batch,
      category,
      supervisor,
      figmaLink,
      githubLink,
      deployLink,
      frontendTech,
      backendTech,
      databaseTech,
      aiLibTech,
      devOpsTech,
      testingTech,
      readme,
      thumbnail,
      screenshots,
      documentation,
    } = req.body;

    const projectFromDB = await Project.findOne({ _id: id });

    if (!projectFromDB) {
      if (
        !title ||
        !description ||
        !campus ||
        !department ||
        !batch ||
        !category ||
        !supervisor
      ) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const project = new Project({
        title,
        description,
        thumbnail,
        campus,
        department,
        batch,
        category,
        supervisor,
        figmaLink,
        githubLink,
        deployLink,
        documentation,
        screenshots,
        frontendTech,
        backendTech,
        databaseTech,
        aiLibTech,
        devOpsTech,
        testingTech,
        readme,
      });
      await project.save();

      return res.status(200).json({
        success: true,
        message: "Project uploaded successfully",
        projectData: {
          ...project._doc,
        },
      });
    } else {
      // Update only the fields that are not already updated
      if (title && title !== projectFromDB.title) projectFromDB.title = title;
      if (description && description !== projectFromDB.description)
        projectFromDB.description = description;
      if (thumbnail && thumbnail !== projectFromDB.thumbnail)
        projectFromDB.thumbnail = thumbnail;
      if (campus && campus !== projectFromDB.campus)
        projectFromDB.campus = campus;
      if (department && department !== projectFromDB.department)
        projectFromDB.department = department;
      if (batch && batch !== projectFromDB.batch) projectFromDB.batch = batch;
      if (category && category !== projectFromDB.category)
        projectFromDB.category = category;
      if (supervisor && supervisor !== projectFromDB.supervisor)
        projectFromDB.supervisor = supervisor;
      if (figmaLink && figmaLink !== projectFromDB.figmaLink)
        projectFromDB.figmaLink = figmaLink;
      if (githubLink && githubLink !== projectFromDB.githubLink)
        projectFromDB.githubLink = githubLink;
      if (deployLink && deployLink !== projectFromDB.deployLink)
        projectFromDB.deployLink = deployLink;
      if (documentation && documentation !== projectFromDB.documentation)
        projectFromDB.documentation = documentation;
      if (frontendTech && frontendTech !== projectFromDB.frontendTech)
        projectFromDB.frontendTech = frontendTech;
      if (backendTech && backendTech !== projectFromDB.backendTech)
        projectFromDB.backendTech = backendTech;
      if (databaseTech && databaseTech !== projectFromDB.databaseTech)
        projectFromDB.databaseTech = databaseTech;
      if (aiLibTech && aiLibTech !== projectFromDB.aiLibTech)
        projectFromDB.aiLibTech = aiLibTech;
      if (devOpsTech && devOpsTech !== projectFromDB.devOpsTech)
        projectFromDB.devOpsTech = devOpsTech;
      if (testingTech && testingTech !== projectFromDB.testingTech)
        projectFromDB.testingTech = testingTech;
      if (readme && readme !== projectFromDB.readme)
        projectFromDB.readme = readme;

      // Handle the screenshots array
      if (screenshots && Array.isArray(screenshots)) {
        const updatedScreenshots = [
          ...projectFromDB.screenshots,
          ...screenshots,
        ].slice(0, 3);
        projectFromDB.screenshots = updatedScreenshots;
      }

      // Save the updated project
      await projectFromDB.save();

      return res.status(200).json({
        success: true,
        message: "Project updated successfully",
        data: {
          ...projectFromDB._doc,
        },
      });
    }
  } catch (error) {
    console.log("error in project upload");
    res.status(400).json({ success: false, message: error.message });
  }
};
