import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String, enum: ["agent", "customer"], required: true },
  type: { type: String, enum: ["signup", "login"], required: true },
  status: { type: String, enum: ["success", "failure"], required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model("UserActivity", userActivitySchema);