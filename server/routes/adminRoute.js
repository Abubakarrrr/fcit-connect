import express from "express";
import {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategories,
  createInitialProject,
  updateProject,
  deleteProject,
  getSingleProject,
  getAllProjects,
  getAllAdminProjects,
  addTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamMember,
  getAllTeamMembers,
} from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/create-user", verifyToken, createUser);
router.post("/update-user/:id", verifyToken, updateUser);
router.post("/delete-user/:id", verifyToken, deleteUser);
router.get("/get-user/:id", verifyToken, getUser);
router.get("/get-all-users", verifyToken, getAllUsers);

router.post("/create-project", verifyToken, createInitialProject);
router.post("/update-project/:id", verifyToken, updateProject);
router.post("/delete-project/:id", verifyToken, deleteProject);
router.get("/get-project/:id", verifyToken, getSingleProject);
router.get("/get-projects", verifyToken, getAllProjects);
router.get("/get-admin-projects", verifyToken, getAllAdminProjects);
router.post("/approve-project/:id", verifyToken);
router.post("/reject-project/:id", verifyToken);

router.post("/create-category", verifyToken, createCategory);
router.post("/update-category/:id", verifyToken, updateCategory);
router.post("/delete-category/:id", verifyToken, deleteCategory);
router.get("/get-category/:id", verifyToken, getCategory);
router.get("/get-all-categories", verifyToken, getAllCategories);

router.post("/add-team-member/:projectId", verifyToken, addTeamMember);
router.post("/update-team-member/:memberId", verifyToken, updateTeamMember);
router.post("/delete-team-member/:memberId", verifyToken, deleteTeamMember);
router.get("/get-team-member/:memberId", verifyToken, getTeamMember);
router.get("/get-all-team-members/:projectId", verifyToken, getAllTeamMembers);

export default router;
