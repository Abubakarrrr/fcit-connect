import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { addReview, getReviews } from "../controllers/userContactController.js";

const router = express.Router();
router.post("/add-review", addReview);
router.get("/get-reviews", getReviews);

export default router;
