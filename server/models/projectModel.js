import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  campus: { type: String, required: true },
  department: { type: String, required: true },
  batch: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Batch",
    type: String,
    required: true,
  }, // Reference to Batch schema
  category: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Category",
    type: String,
    required: true,
  }, // Reference to Category schema
  supervisor: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "Supervisor",
    type: String,
    required: true,
  }, // Reference to Supervisor schema
  figmaLink: { type: String, default: null }, // Link to the Figma design
  githubLink: { type: String, default: null }, // Link to the GitHub repository
  deployLink: { type: String, default: null }, // Link to the deployed version
  frontendTech: [{ type: String }],
  backendTech: [{ type: String }],
  databaseTech: [{ type: String }],
  aiLibTech: [{ type: String }],
  devOpsTech: [{ type: String }],
  testingTech: [{ type: String }],

  thumbnail: { type: String, required: true },
  documentation: { type: String },
  screenshots: [{ type: String }],
  readme: { type: String },
  likes: { type: Number, default: 0 }, // Number of likes
  views: { type: Number, default: 0 }, // Number of views
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  }, // Status of the project
  feedback: { type: String, default: null }, // Admin feedback for the project
  created_at: { type: Date, default: Date.now }, // Timestamp for project creation
  updated_at: { type: Date, default: Date.now }, // Timestamp for the last update
});

const Project = mongoose.model("Project", ProjectSchema);
export { Project };
