const mongoose = require('mongoose');

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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('BasicQuestion', basicQuestionSchema); 