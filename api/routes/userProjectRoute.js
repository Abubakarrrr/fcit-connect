import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  createInitialProject,
  updateProject,
  getAllProjects,
  getAllProjectsPage,
  getAllEmbeddingProjects,
  getSingleProject,
  getSingleUserProject,
  // searchProjects,
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
  getStatistics,
  likeProject,
  getTop10Projects,
  unLikeProject,
} from "../controllers/userProjectController.js";

const router = express.Router();
router.post("/create-project", verifyToken, createInitialProject);
router.post("/update-project/:id", verifyToken, updateProject);
router.post("/delete-project/:id", verifyToken, deleteProject);
router.post("/like-project/:id", verifyToken, likeProject);
router.post("/unlike-project/:id", verifyToken, unLikeProject);
router.get("/get-user-project/:id", verifyToken, getSingleUserProject);
router.get("/get-projects", getAllProjects);
router.get("/get-top10-projects", getTop10Projects);
router.get("/get-project/:id", getSingleProject);
router.get("/get-embedding-projects",  getAllEmbeddingProjects);
router.get("/get-projects-page", getAllProjectsPage);
// router.get("/search-projects", searchProjects);
router.get("/statistics", getStatistics);

router.post("/add-team-member/:projectId", verifyToken, addTeamMember);
router.post("/update-team-member/:memberId", verifyToken, updateTeamMember);
router.post("/delete-team-member/:memberId", verifyToken, deleteTeamMember);
router.get("/get-team-member/:memberId", verifyToken, getTeamMember);
router.get("/get-all-team-members/:projectId", verifyToken, getAllTeamMembers);

router.post("/upload-file/:id", verifyToken, uploadFile);
router.post("/delete-file/:id", verifyToken, deleteFile);

router.get("/get-all-categories", getAllCategories);
router.get("/get-all-supervisors", getAllSupervisors);

export default router;
