import bcrypt from "bcryptjs";
import crypto from "crypto";

import { User } from "../models/index.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";
import {
  OTPVerificationTemplate,
  PasswordResetTemplate,
} from "../utils/emailTemplate.js";
import sendEmail from "../utils/sendEmail.js";

export const signup = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }
    const userAlreadyExists = await User.findOne({ email: email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 3600 * 1000,
    });

    await user.save();

    // jwt
    const token = generateTokenAndSetCookie(res, user._id);
    // send verfication email

    await sendEmail(
      user.email,
      `Welcome to FCIT Connect, ${user.name}`,
      OTPVerificationTemplate(verificationToken)
    );

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in signup");
    res.status(400).json({ success: false, message: error.message });
  }
};
export const loginWithGoogle = async (req, res) => {
  const { googleUser } = req.body;
  try {
    if (!googleUser) {
      throw new Error("No User Found");
    }
    const userFromDB = await User.findOne({ email: googleUser.email });

    if (userFromDB) {
      userFromDB.lastLogin = new Date();
      await userFromDB.save();
      generateTokenAndSetCookie(res, userFromDB._id);
      return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
          ...userFromDB._doc,
          password: undefined,
        },
      });
    }

    const user = new User({
      email: googleUser.email,
      password: undefined,
      name: googleUser.displayName,
      isVerified: true,
      profilePicture: googleUser.photoURL,
    });

    await user.save();

    // jwt
    generateTokenAndSetCookie(res, user._id);

    res.status(200).json({
      success: true,
      message: "User created successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in signup");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "invalid or expired verification code",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "User verified successfully",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in verifyEmail");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const userFromDB = await User.findOne({ email: email });

    if (!userFromDB || !userFromDB.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, userFromDB.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    // jwt
    const token = generateTokenAndSetCookie(res, userFromDB._id);

    userFromDB.lastLogin = new Date();
    await userFromDB.save();

    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user: {
        ...userFromDB._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in login");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new Error("All fields are required");
    }
    const userFromDB = await User.findOne({ email: email });

    if (!userFromDB) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const passwordResetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 hour

    userFromDB.resetPasswordToken = passwordResetToken;
    userFromDB.resetPasswordExpiresAt = passwordResetTokenExpiresAt;
    await userFromDB.save();

    await sendEmail(
      userFromDB.email,
      "Password Reset",
      PasswordResetTemplate(
        `${process.env.CLIENT_URL}/reset-password/${userFromDB.resetPasswordToken}`
      )
    );

    res.status(200).json({
      success: true,
      message: "Password reset link email sent successfully",
    });
  } catch (error) {
    console.log("error in forgotPassword");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, password, confirmPassword } = req.body;
  try {
    const userFromDB = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!userFromDB) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    if (password === confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userFromDB.password = hashedPassword;
      await userFromDB.save();
    } else {
      res.status(400).json({
        success: false,
        message: "New password and confirm new password not matched",
      });
    }
    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("error in resetPassword");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  const { userId } = req;
  try {
    const userFromDB = await User.findOne({ _id: userId });
    if (!userFromDB || !userFromDB.isActive) {
      return res
        .status(400)
        .json({ success: false, message: "User Authentication Failed" });
    }

    res.status(200).json({
      success: true,
      message: "User is authorized",
      user: {
        ...userFromDB._doc,
        password: undefined,
      },
    });
  } catch (error) {
    console.log("error in checkAuth");
    res.status(400).json({ success: false, message: error.message });
  }
};

export const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      throw new Error("Email is required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }
    if (user.isVerified) {
      return res.status(400).json({ success: false, message: "User already verified" });
    }
    // Generate new verification token and expiry
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationToken = verificationToken;
    user.verificationExpiresAt = Date.now() + 24 * 3600 * 1000;
    await user.save();
    await sendEmail(
      user.email,
      `Resend: Verify your email for FCIT Connect, ${user.name}`,
      OTPVerificationTemplate(verificationToken)
    );
    res.status(200).json({
      success: true,
      message: "Verification email resent successfully",
    });
  } catch (error) {
    console.log("error in resendVerificationEmail");
    res.status(400).json({ success: false, message: error.message });
  }
};
