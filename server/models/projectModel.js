import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  campus: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Category",
    type: String,
    required: true,
  },
  supervisor: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Supervisor",
    type: String,
    required: true,
  },
  githubLink: { type: String, default: null, required: true },
  figmaLink: { type: String, default: null },
  deployLink: { type: String, default: null },
  frontendTech: [{ type: String }],
  backendTech: [{ type: String }],
  databaseTech: [{ type: String }],
  aiLibTech: [{ type: String }],
  devOpsTech: [{ type: String }],
  testingTech: [{ type: String }],
  readme: { type: String },
  likes: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  feedback: { type: String, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
export { Project };
