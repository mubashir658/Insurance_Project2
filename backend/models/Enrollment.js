import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
  enrollmentId: {
    type: String,
    required: true,
    unique: true
  },
  policyId: {
    type: String,
    required: true,
    ref: 'Policy'
  },
  agentId: {
    type: String,
    ref: 'Agent',
    default: null
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);

export default Enrollment; 