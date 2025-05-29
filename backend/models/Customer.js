/*import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

export default mongoose.model("Customer", customerSchema);*/
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'customer' },
  phone: { type: String },
  address: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Customer", customerSchema);