import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  employeeId: { type: String, required: true, unique: true },
  role: { type: String, default: 'agent' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Agent", agentSchema);