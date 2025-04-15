import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
  email: String,
  role: String, // 'customer' or 'agent'
  type: String, // 'signup' or 'login'
  status: String, // 'success' or 'failure'
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("UserActivity", userActivitySchema);