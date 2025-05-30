import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/AuthRoutes.js";
import basicQuestionRoutes from "./routes/BasicQuestionRoutes.js";
import profileRoutes from './routes/ProfileRoutes.js';
import feedbackRoutes from './routes/feedback.js';
import policyRoutes from './routes/policies.js';

dotenv.config();

const app = express();

// Configure CORS to allow requests from the frontend
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url} Headers:`, req.headers);
  next();
});

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/insurance_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();

app.use("/auth", authRoutes);
app.use("/api/basic-questions", basicQuestionRoutes);
app.use("/api", profileRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/policies", policyRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint for quick testing
app.get('/', (req, res) => {
  res.json({ 
    message: 'Insurance API is running',
    version: '1.0.0',
    endpoints: [
      '/health',
      '/auth/login',
      '/auth/signup',
      '/api/profile',
      '/api/basic-questions',
      '/api/basic-questions/test',
      '/api/basic-questions/auth-test'
    ]
  });
});

app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});