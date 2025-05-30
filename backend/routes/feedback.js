import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// Create new feedback
router.post('/', async (req, res) => {
    try {
        const { userId, feedbackText } = req.body;
        const feedback = new Feedback({
            userId,
            feedbackText
        });
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all feedbacks
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId', 'name email');
        res.json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update feedback status
router.patch('/:id', async (req, res) => {
    try {
        console.log('Received feedback update request:', {
            id: req.params.id,
            body: req.body,
            headers: req.headers
        });

        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            console.log('Feedback not found:', req.params.id);
            return res.status(404).json({ message: 'Feedback not found' });
        }

        console.log('Found feedback:', feedback);
        feedback.isSolved = req.body.isSolved;
        await feedback.save();
        console.log('Updated feedback:', feedback);
        
        res.json(feedback);
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(400).json({ message: error.message });
    }
});

// Delete feedback
router.delete('/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }
        await feedback.deleteOne();
        res.json({ message: 'Feedback deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router; 