import mongoose from 'mongoose';

const policySchema = new mongoose.Schema({
  policyId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Health', 'Life', 'Auto', 'Property']
  },
  premium: {
    type: Number,
    required: true
  },
  features: [{
    title: String,
    description: String
  }],
  durations: {
    type: Map,
    of: Number
  },
  riders: [{
    name: String,
    price: Number,
    description: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the model if it doesn't exist
const Policy = mongoose.model('Policy', policySchema);

export default Policy; 