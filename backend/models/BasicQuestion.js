/*import mongoose from 'mongoose';

const basicQuestionSchema = new mongoose.Schema({
  gender: String,
  area: String,
  qualification: String,
  income: String,
  vintage: String,
  claimAmount: String,
  numberOfPolicies: String,
  policiesChosen: String,
  policyType: String,
  maritalStatus: String,
  re
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('BasicQuestion', basicQuestionSchema); */
// models/BasicQuestion.js
import mongoose from 'mongoose';

const basicQuestionSchema = new mongoose.Schema({
  name: { type: String, required: true }, // ✅ Mark as required
  email: { type: String, required: true }, // ✅ Mark as required
  gender: String,
  area: String,
  qualification: String,
  income: String,
  vintage: String,
  claimAmount: String,
  numberOfPolicies: String,
  policiesChosen: String,
  policyType: String,
  maritalStatus: String,
  result: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('BasicQuestion', basicQuestionSchema);
