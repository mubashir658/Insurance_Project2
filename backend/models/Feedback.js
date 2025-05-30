import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    feedbackText: {
        type: String,
        required: true,
        maxlength: 250 // Approximately 50 words
    },
    isSolved: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 259200 // 3 days in seconds (3 * 24 * 60 * 60)
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback; 