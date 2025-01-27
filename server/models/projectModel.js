import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  campus: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  supervisor: { type: String, required: true },
  githubLink: { type: String, default: null, required: true },

  thumbnail: { type: String },
  documentation: { type: String },
  images: [{ type: String }],
  figmaLink: { type: String, default: null },
  deployLink: { type: String, default: null },
  frontend: [{ type: String }],
  backend: [{ type: String }],
  database: [{ type: String }],
  aiLibraries: [{ type: String }],
  devops: [{ type: String }],
  testing: [{ type: String }],
  readme: { type: String },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdByAdmin: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  feedback: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  teamMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeamMember" }],
  updated_at: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
export { Project };
