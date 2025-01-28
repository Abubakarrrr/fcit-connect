import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createInitialProject,
  updateProject,
  getAllProjects,
  getSingleProject,
  getSingleUserProject,
  deleteProject,
  addTeamMember,
  deleteTeamMember,
  updateTeamMember,
  getTeamMember,
  getAllTeamMembers,
  uploadFile,
  deleteFile,
  getAllCategories,
  getAllSupervisors,
} from "../controllers/userProjectController.js";

const router = express.Router();
router.post("/create-project", verifyToken, createInitialProject);
router.post("/update-project/:id", verifyToken, updateProject);
router.post("/delete-project/:id", verifyToken, deleteProject);
router.get("/get-user-project/:id", verifyToken, getSingleUserProject);
router.get("/get-project/:id", getSingleProject);
router.get("/get-projects", getAllProjects);

router.post("/add-team-member", verifyToken, addTeamMember);
router.post("/update-team-member/:id", verifyToken, updateTeamMember);
router.post("/delete-team-member/:id", verifyToken, deleteTeamMember);
router.get("/get-team-member/:id", verifyToken, getTeamMember);
router.get("/get-all-team-members", verifyToken, getAllTeamMembers);

router.post("/upload-file/:id", verifyToken, uploadFile);
router.post("/delete-file/:id", verifyToken, deleteFile);

router.get("/get-all-categories", getAllCategories);
router.get("/get-all-supervisors", getAllSupervisors);

export default router;
