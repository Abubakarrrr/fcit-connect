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
} from "../controllers/adminController.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/create-user", createUser);
router.post("/update-user/:id", updateUser);
router.post("/delete-user/:id", deleteUser);
router.get("/get-user/:id", getUser);
router.get("/get-all-users", getAllUsers);

// router.post("/create-project", );
// router.post("/update-project/:id", );
// router.post("/delete-project/:id", );
// router.get("/get-project/:id", );
// router.get("/get-all-projects", );
// router.post("/approve-project/:id", );
// router.post("/reject-project/:id", );

router.post("/create-category", createCategory);
router.post("/update-category/:id", updateCategory);
router.post("/delete-category/:id", deleteCategory);
router.get("/get-category/:id", getCategory);
router.get("/get-all-categories", getAllCategories);


export default router;
