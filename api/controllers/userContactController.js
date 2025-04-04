import { User, Review } from "../models/index.js";

export const addReview = async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;
    // const userId = req.userId;/

    if (!name || !email || !comment) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    // const user = await User.findById(userId);
    // if (!user) {
    //   return res
    //     .status(403)
    //     .json({ success: false, message: "Unauthorized: No user found" });
    // }
    const review = new Review({
      name,
      email,
      comment,
      rating,
      // user: user._id,
    });
    await review.save();

    return res.status(200).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.log("error in adding review");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    if (!reviews) {
      return res
        .status(400)
        .json({ success: false, message: "No Reviews Found" });
    }
    return res.status(200).json({
      success: true,
      message: "Reviews found successfully",
      reviews,
    });
  } catch (error) {
    console.log("error in getting reviews");
    res.status(400).json({ success: false, message: error.message });
  }
};
