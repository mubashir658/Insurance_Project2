import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected to database:", process.env.MONGO_URI);
    
    // Create collections if they don't exist
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('customers')) {
      await db.createCollection('customers');
      console.log("Created 'customers' collection");
    }

    if (!collectionNames.includes('basicquestions')) {
      await db.createCollection('basicquestions');
      console.log("Created 'basicquestions' collection");
    }

    if (!collectionNames.includes('users')) {
      await db.createCollection('users');
      console.log("Created 'users' collection");
    }

    // Verify collections
    console.log("Available collections:", collectionNames);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Call connectDB
connectDB();

// User Schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'agent'], required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Customer Schema
const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// BasicQuestion Schema
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
  createdAt: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);
const BasicQuestion = mongoose.model('BasicQuestion', basicQuestionSchema);

// User Routes
app.post('/auth/signup', async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    // Validate required fields
    if (!fullName || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    // Validate role
    if (!['customer', 'agent'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role. Must be either customer or agent'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      role
    });

    await user.save();
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Login route
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Return user data (excluding password)
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Customer Routes
app.post('/api/customers', async (req, res) => {
  try {
    const customer = new Customer(req.body);
    await customer.save();
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/customers', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// BasicQuestion Routes
app.post('/api/basic-questions', async (req, res) => {
  try {
    console.log("Received form data:", JSON.stringify(req.body, null, 2));
    
    // Validate required fields
    const requiredFields = ['gender', 'area', 'qualification', 'income', 'vintage', 'claimAmount', 'numberOfPolicies', 'policiesChosen', 'policyType', 'maritalStatus'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      console.log("Missing required fields:", missingFields);
      return res.status(400).json({
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      });
    }

    const question = new BasicQuestion(req.body);
    console.log("Attempting to save question:", JSON.stringify(question, null, 2));
    
    await question.save();
    console.log("Question saved successfully");
    
    res.status(201).json({
      success: true,
      message: 'Form data saved successfully',
      data: question
    });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(400).json({
      success: false,
      message: error.message,
      error: error
    });
  }
});

app.get('/api/basic-questions', async (req, res) => {
  try {
    const questions = await BasicQuestion.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error Handling
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});