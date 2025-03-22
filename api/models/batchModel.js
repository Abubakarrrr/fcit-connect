import mongoose from "mongoose";

const BatchSchema = new mongoose.Schema({
  year: { type: Number, required: true }, // Batch year
  campus: { type: String, enum: ["new", "old"], default: "new" }, // campus
});

const Batch = mongoose.model("Batch", BatchSchema);
export { Batch };