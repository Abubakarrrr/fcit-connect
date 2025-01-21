import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rollNo: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String },
  github: { type: String },
  linkedIn: { type: String },
  project: {
    type: { type: Schema.Types.ObjectId, ref: "Project" },
  },
  teamLeader: {
    type: { type: Schema.Types.ObjectId, ref: "User" },
  },
});
const User = mongoose.model("User", UserSchema);
export { User };
