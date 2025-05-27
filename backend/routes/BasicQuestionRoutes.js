import express from 'express';
   import axios from 'axios';
   import BasicQuestion from '../models/BasicQuestion.js';
   import Customer from '../models/Customer.js';
   import authMiddleware from '../middleware/auth.js';

   const router = express.Router();
   
   // Test route to verify API is working (no auth required)
   router.get('/test', (req, res) => {
     res.status(200).json({ 
       message: 'API is working correctly',
       timestamp: new Date().toISOString()
     });
   });
   
   // Test route to verify authentication is working
   router.get('/auth-test', authMiddleware, (req, res) => {
     res.status(200).json({ 
       message: 'Authentication is working correctly',
       user: req.user,
       timestamp: new Date().toISOString()
     });
   });

   // GET route to fetch user's data
router.get('/user-data', authMiddleware, async (req, res) => {
  try {
    console.log("Fetching data for user:", req.user.id);
    
    // Find the user's data
    const userData = await BasicQuestion.findOne({ 
      userId: req.user.id 
    });
    
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        message: "No data found for this user" 
      });
    }
    
    res.status(200).json({
      success: true,
      data: {
        age: userData.age,
        bmi: userData.bmi,
        smoker: userData.smoker,
        dependents: userData.dependents,
        hospital_visits_last_year: userData.hospital_visits_last_year,
        chronic_disease: userData.chronic_disease,
        physical_activity_level: userData.physical_activity_level,
        alcohol_consumption: userData.alcohol_consumption,
        gender: userData.gender,
        income: userData.income,
        pre_existing_conditions: userData.pre_existing_conditions,
        lastSubmitted: userData.updatedAt || userData.createdAt
      }
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

// POST route to submit basic questions
router.post('/', authMiddleware, async (req, res) => {
  try {
    const formData = req.body;
    const userId = req.user.id;
    
    // Get prediction from Flask service
    const flaskResponse = await axios.post('http://localhost:5001/predict', formData, {
      headers: { 'Content-Type': 'application/json' }
    });
    const { result, probability } = flaskResponse.data;

    // Always check for existing entry for this user
    const existingEntry = await BasicQuestion.findOne({ userId: userId });
    
    if (existingEntry) {
      console.log("Updating existing entry for user:", userId);
      
      // Update the existing entry
      existingEntry.age = formData.age;
      existingEntry.bmi = formData.bmi;
      existingEntry.smoker = formData.smoker;
      existingEntry.dependents = formData.dependents;
      existingEntry.hospital_visits_last_year = formData.hospital_visits_last_year;
      existingEntry.chronic_disease = formData.chronic_disease;
      existingEntry.physical_activity_level = formData.physical_activity_level;
      existingEntry.alcohol_consumption = formData.alcohol_consumption;
      existingEntry.gender = formData.gender;
      existingEntry.income = formData.income;
      existingEntry.pre_existing_conditions = formData.pre_existing_conditions;
      existingEntry.result = result;
      existingEntry.probability = probability;
      existingEntry.updatedAt = new Date();
      
      await existingEntry.save();
      
      return res.status(200).json({ 
        success: true, 
        message: "Data updated successfully",
        updated: true
      });
    } else {
      // Create a new entry
      console.log("Creating new entry for user:", userId);
      const newQuestion = new BasicQuestion({
        userId: userId,
        age: formData.age,
        bmi: formData.bmi,
        smoker: formData.smoker,
        dependents: formData.dependents,
        hospital_visits_last_year: formData.hospital_visits_last_year,
        chronic_disease: formData.chronic_disease,
        physical_activity_level: formData.physical_activity_level,
        alcohol_consumption: formData.alcohol_consumption,
        gender: formData.gender,
        income: formData.income,
        pre_existing_conditions: formData.pre_existing_conditions,
        result,
        probability,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await newQuestion.save();

      return res.status(201).json({ 
        success: true, 
        message: "Data saved successfully",
        updated: false
      });
    }
  } catch (error) {
    console.error("Error saving basic questions:", error.message);
    res.status(500).json({ 
      success: false, 
      message: error.response?.data?.error || error.message 
    });
  }
});

   // GET route to fetch all client data for agents
   router.get('/', authMiddleware, async (req, res) => {
     try {
       console.log("GET /api/basic-questions - User:", req.user);
       
       // For testing purposes, return some dummy data if no real data exists
       const count = await BasicQuestion.countDocuments();
       console.log(`Found ${count} basic questions in database`);
       
       if (count === 0) {
         // Return dummy data for testing
         console.log("No data found, returning dummy data");
         return res.status(200).json([
           {
             _id: "dummy1",
             name: "John Doe",
             email: "john@example.com",
             age: 35,
             gender: "Male",
             income: 75000,
             bmi: 24.5,
             smoker: "No",
             dependents: 2,
             hospital_visits: 1,
             chronic_disease: "No",
             physical_activity: 3,
             alcohol_consumption: 2,
             pre_existing_conditions: "No",
             result: "Yes",
             probability: 0.85,
             createdAt: new Date(),
             updatedAt: new Date()
           }
         ]);
       }
       
       // Fetch all basic questions with populated user data
       // Group by userId to ensure only one entry per user (the most recent one)
       const clientData = await BasicQuestion.aggregate([
         // Sort by updatedAt to get the most recent entry for each user
         { $sort: { updatedAt: -1 } },
         // Group by userId and keep only the first (most recent) document for each user
         { $group: {
             _id: "$userId",
             doc: { $first: "$$ROOT" }
         }},
         // Replace the root with the document we kept
         { $replaceRoot: { newRoot: "$doc" } }
       ]);
       
       // Populate the user data for each entry
       await BasicQuestion.populate(clientData, {
         path: 'userId',
         model: 'Customer',
         select: 'name email'
       });
       
       console.log(`Successfully fetched ${clientData.length} unique client records`);

       // Format the data for client display
       const formattedClientData = clientData.map(client => {
         return {
           _id: client._id,
           name: client.userId?.name || 'Unknown',
           email: client.userId?.email || 'No email',
           age: client.age,
           gender: client.gender === 1 ? 'Male' : 'Female',
           income: client.income,
           bmi: client.bmi,
           smoker: client.smoker === 1 ? 'Yes' : 'No',
           dependents: client.dependents,
           hospital_visits: client.hospital_visits_last_year,
           chronic_disease: client.chronic_disease === 1 ? 'Yes' : 'No',
           physical_activity: client.physical_activity_level,
           alcohol_consumption: client.alcohol_consumption,
           pre_existing_conditions: client.pre_existing_conditions === 1 ? 'Yes' : 'No',
           result: client.result,
           probability: client.probability,
           createdAt: client.createdAt,
           updatedAt: client.updatedAt || client.createdAt
         };
       });

       res.status(200).json(formattedClientData);
     } catch (error) {
       console.error("Error fetching client data:", error.message);
       res.status(500).json({ success: false, message: error.message });
     }
   });

   export default router;