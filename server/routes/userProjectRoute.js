import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { createInitialProject, getAllProjects, getSingleProject, getSingleUserProject } from "../controllers/userProjectController.js";
import { isStudent } from "../middlewares/isStudent.js";

const router = express.Router();
router.post("/create-project", verifyToken, createInitialProject);
router.get("/get-user-project", verifyToken, getSingleUserProject);
router.get("/get-project/:projectId", getSingleProject);
router.get("/get-projects", getAllProjects);
export default router;
