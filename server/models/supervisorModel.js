import mongoose from "mongoose";

const SupervisorSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Supervisor's name
  email: { type: String, required: true }, // Contact email
  department: { type: String, default: null }, // Optional department/field of expertise
});
const Supervisor = mongoose.model("Supervisor", SupervisorSchema);
export { Supervisor };
