import mongoose from "mongoose";

const FileSchema = new mongoose.Schema({
  file_url: { type: String, required: true }, // URL to access the file
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // Reference to the associated project
  uploaded_at: { type: Date, default: Date.now },
});

const File = mongoose.model("File", FileSchema);
export { File };
