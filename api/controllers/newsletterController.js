import { Newsletter } from "../models/index.js";

export const subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required",
      });
    }

    // Check if email already exists
    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
      // Email already exists in database
      if (existingSubscriber.active) {
        return res.status(400).json({
          success: false,
          message: "This email is already subscribed to our newsletter",
        });
      } else {
        // Reactivate subscription if it was previously deactivated
        existingSubscriber.active = true;
        await existingSubscriber.save();

        return res.status(200).json({
          success: true,
          message: "Your subscription has been reactivated",
        });
      }
    }

    // Create new subscriber
    const newSubscriber = new Newsletter({ email });
    await newSubscriber.save();

    res.status(201).json({
      success: true,
      message: "Successfully subscribed to newsletter",
      data: { email: newSubscriber.email },
    });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your subscription",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Unsubscribe from newsletter
export const unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email address is required",
      });
    }

    const subscriber = await Newsletter.findOne({ email });

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Email not found in our subscribers list",
      });
    }

    // Instead of deleting, mark as inactive
    subscriber.active = false;
    await subscriber.save();

    res.status(200).json({
      success: true,
      message: "Successfully unsubscribed from newsletter",
    });
  } catch (error) {
    console.error("Newsletter unsubscription error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your unsubscription request",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Get all active subscribers (admin endpoint)
export const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await Newsletter.find({ active: true })
      .select("email subscriptionDate")
      .sort({ subscriptionDate: -1 });

    res.status(200).json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    console.error("Get subscribers error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving subscribers",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

