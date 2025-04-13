import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/AuthRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected to database:", process.env.MONGO_URI);
    // Verify collections
    mongoose.connection.db.listCollections().toArray((err, collections) => {
      if (err) {
        console.error("Error listing collections:", err.message);
        return;
      }
      console.log("Available collections:", collections.map(c => c.name));
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Error Handling
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});