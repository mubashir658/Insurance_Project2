import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  employeeId: { type: String, required: true },
});

export default mongoose.model("Agent", agentSchema);