/*import mongoose from "mongoose";

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
*/
import mongoose from "mongoose";

const userActivitySchema = new mongoose.Schema({
  email: { type: String, required: true },
  role: { type: String, enum: ["agent", "customer"], required: true },
  type: { type: String, enum: ["signup", "login"], required: true },
  status: { type: String, enum: ["success", "failure"], required: true },
  timestamp: { type: Date, default: Date.now }
});

const UserActivity = mongoose.model("UserActivity", userActivitySchema);

export default UserActivity;
