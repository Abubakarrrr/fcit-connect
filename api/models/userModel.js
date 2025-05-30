import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["user", "admin", "supervisor"],
    default: "user",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  verificationToken: { type: String, default: undefined },
  verificationExpiresAt: { type: Date, default: undefined },
  resetPasswordToken: { type: String, default: undefined },
  resetPasswordExpiresAt: { type: Date, default: undefined },
  profilePicture: { type: String, default: null },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  adminProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
});
const User = mongoose.model("User", UserSchema);
export { User };
