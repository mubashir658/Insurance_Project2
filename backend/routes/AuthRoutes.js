import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// **Signup Route**
router.post("/signup", async (req, res) => {
  const { name, email, password, employeeId } = req.body;

  try {
    console.log("Signup attempt:", { email, employeeId });

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required",
      });
    }
    if (employeeId && employeeId.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Employee ID cannot be empty if provided",
      });
    }

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, employeeId });
    await newUser.save();
    console.log("User created:", {
      email,
      employeeId,
      userId: newUser._id,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: newUser._id,
    });
  } catch (error) {
    console.error("Signup error:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      message: error.message.includes("validation")
        ? "Invalid user data"
        : "Error creating user",
    });
  }
});

// **Login Route**
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login attempt:", { email });

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check JWT_SECRET
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      employeeId: user.employeeId || null,
    };
    console.log("Login successful:", {
      email,
      employeeId: userData.employeeId,
      userId: user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("Login error:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(500).json({
      success: false,
      message: "Error during login",
    });
  }
});

// **Verify Token Route**
router.get("/verify", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined");
      return res.status(500).json({
        success: false,
        message: "Server configuration error",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("Token verified:", { userId: user._id, email: user.email });

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        employeeId: user.employeeId || null,
      },
    });
  } catch (error) {
    console.error("Verify error:", {
      message: error.message,
      stack: error.stack,
    });
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});

export default router;