import express from "express";
import Customer from "../models/User.js";
import Agent from "../models/Agent.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// **Signup Route**
router.post("/signup", async (req, res) => {
  const { name, email, password, employeeId, role } = req.body;

  try {
    console.log("Signup attempt:", { email, employeeId, role });

    // Validate input
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if user already exists in either collection
    const existingCustomer = await Customer.findOne({ email });
    const existingAgent = await Agent.findOne({ email });
    if (existingCustomer || existingAgent) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // Create user based on role
    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (role === 'agent') {
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required for agents",
        });
      }
      newUser = new Agent({ name, email, password: hashedPassword, employeeId });
    } else {
      newUser = new Customer({ fullName: name, email, password: hashedPassword });

    }

    await newUser.save();
    console.log("User created:", {
      email,
      employeeId,
      role,
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
  const { email, password, role } = req.body;

  try {
    console.log("Login attempt:", { email, role });

    // Validate input
    if (!email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and role are required",
      });
    }

    // Find user in appropriate collection
    let user;
    if (role === 'agent') {
      user = await Agent.findOne({ email });
    } else {
      user = await Customer.findOne({ email });
    }

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

    // Generate token
    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      employeeId: user.employeeId || null,
    };

    console.log("Login successful:", {
      email,
      role,
      userId: user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: userData,
      token
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    if (decoded.role === 'agent') {
      user = await Agent.findById(decoded.userId).select("-password");
    } else {
      user = await Customer.findById(decoded.userId).select("-password");
    }

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
        role: user.role,
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