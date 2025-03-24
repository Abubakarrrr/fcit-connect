import mongoose from "mongoose";

const VectorEmbeddingSchema = new mongoose.Schema({
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  }, // Reference to the associated project
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user who owns the project
  vector: { type: [Number], required: true }, // High-dimensional vector (store only if not using a vector database)
  created_at: { type: Date, default: Date.now }, // Timestamp when the embedding was generated
});
const VectorEmbedding = mongoose.model("VectorEmbedding", VectorEmbeddingSchema);
export { VectorEmbedding };
