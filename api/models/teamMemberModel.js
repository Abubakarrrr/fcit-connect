import mongoose, { Schema } from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true},
  role: { type: String },
  github: { type: String },
  linkedin: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  teamLeader: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const TeamMember = mongoose.model("TeamMember", TeamMemberSchema);
export { TeamMember };
