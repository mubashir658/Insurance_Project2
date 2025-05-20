import express from 'express';
   import axios from 'axios';
   import BasicQuestion from '../models/BasicQuestion.js';
   import authMiddleware from '../middleware/auth.js';

   const router = express.Router();

   router.post('/', authMiddleware, async (req, res) => {
     try {
       const flaskResponse = await axios.post('http://localhost:5001/predict', req.body, {
         headers: { 'Content-Type': 'application/json' }
       });
       const { result, probability } = flaskResponse.data;

       const newQuestion = new BasicQuestion({
         userId: req.user.id,
         age: req.body.age,
         bmi: req.body.bmi,
         smoker: req.body.smoker,
         dependents: req.body.dependents,
         hospital_visits_last_year: req.body.hospital_visits_last_year,
         chronic_disease: req.body.chronic_disease,
         physical_activity_level: req.body.physical_activity_level,
         alcohol_consumption: req.body.alcohol_consumption,
         gender: req.body.gender,
         income: req.body.income,
         pre_existing_conditions: req.body.pre_existing_conditions,
         result,
         probability,
         createdAt: new Date()
       });
       await newQuestion.save();

       res.status(201).json({ success: true, message: "Data saved successfully" });
     } catch (error) {
       console.error("Error saving basic questions:", error.message);
       res.status(500).json({ success: false, message: error.response?.data?.error || error.message });
     }
   });

   export default router;