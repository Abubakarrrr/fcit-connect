import express from "express";
import {
  
} from "../controllers/sharedController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();


router.post("/create-teamMember", createUser);
router.post("/update-teamMember/:id", updateUser);
router.post("/delete-teamMember/:id", deleteUser);
router.get("/get-teamMember/:id", getUser);
router.get("/get-all-teamMembers", getAllUsers);


export default router;
