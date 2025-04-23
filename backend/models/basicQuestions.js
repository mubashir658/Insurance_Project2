/*const express = require('express');
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

module.exports = router;*/
// routes/basicQuestionRoutes.js

/*
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const BasicQuestion = require('../models/BasicQuestion');
const Customer = require('../models/Customer'); // Make sure this path is correct

router.post('/submit', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.userId);

    if (!customer) {
      return res.status(401).json({ error: "User not found" });
    }

    const dataWithUser = {
      ...req.body,
      name: customer.name,
      email: customer.email,
    };

    const basicQuestion = new BasicQuestion(dataWithUser);
    await basicQuestion.save();

    res.status(201).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ error: 'Error saving form data' });
  }
});

module.exports = router;
*/
const express = require('express');
const router = express.Router();
const BasicQuestion = require('../models/BasicQuestion');

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      gender,
      area,
      qualification,
      income,
      vintage,
      claimAmount,
      numberOfPolicies,
      policiesChosen,
      policyType,
      maritalStatus,
      result,
    } = req.body;

    const newEntry = new BasicQuestion({
      name,
      email,
      gender,
      area,
      qualification,
      income,
      vintage,
      claimAmount,
      numberOfPolicies,
      policiesChosen,
      policyType,
      maritalStatus,
      result,
    });

    await newEntry.save();
    res.status(200).json({ success: true, message: 'Form data saved' });
  } catch (error) {
    console.error("Error saving basic questions:", error);
    res.status(500).json({ success: false, message: 'Failed to save form data' });
  }
});

module.exports = router;
