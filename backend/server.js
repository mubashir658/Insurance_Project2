import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import basicQuestionRoutes from "./routes/BasicQuestionRoutes.js";
// Import punycode for ES Modules
import punycode from "punycode/punycode.js";

// Load environment variables
dotenv.config();

// Suppress Mongoose strictQuery warning
mongoose.set('strictQuery', true);

const app = express();

// Enable CORS for frontend origin
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Log incoming requests for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    if (!collectionNames.includes('customers')) await db.createCollection('customers');
    if (!collectionNames.includes('basicquestions')) await db.createCollection('basicquestions');

    console.log("Available collections:", collectionNames);
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

// Models
import Customer from "./models/Customer.js";
import BasicQuestion from "./models/BasicQuestion.js";

// Routes
app.use("/auth", authRoutes);
app.use("/api/basic-questions", basicQuestionRoutes);

// Get all basic questions
app.get('/api/basic-questions', async (req, res) => {
  try {
    const questions = await BasicQuestion.find().sort({ createdAt: -1 });
    res.json(questions);
  } catch (error) {
    console.error("Error fetching basic questions:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to fetch basic questions" });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error Handler Middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});