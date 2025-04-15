const express = require('express');
const router = express.Router();
const BasicQuestion = require('../models/BasicQuestion');

router.post('/submit', async (req, res) => {
  try {
    const basicQuestion = new BasicQuestion(req.body);
    await basicQuestion.save();
    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Error saving form data' });
  }
});

module.exports = router;