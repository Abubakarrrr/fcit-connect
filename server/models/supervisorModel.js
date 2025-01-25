import mongoose from "mongoose";

const SupervisorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true }, 
  department: { type: String, default: null },
});
const Supervisor = mongoose.model("Supervisor", SupervisorSchema);
export { Supervisor };
