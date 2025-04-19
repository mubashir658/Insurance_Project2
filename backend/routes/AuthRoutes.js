import express from "express";
import Customer from "../models/Customer.js";
import Agent from "../models/Agent.js";
import UserActivity from "../models/UserActivity.js"; // ✅ Correct path
import sendEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Activity Logger
const logUserActivity = async ({ email, role, type, status }) => {
  try {
    await UserActivity.create({ email, role, type, status });
  } catch (err) {
    console.error("Failed to log activity:", err.message);
  }
};


// ✅ SIGNUP
/*router.post("/signup", async (req, res) => {
  const { name, email, password, employeeId, role } = req.body;

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingCustomer = await Customer.findOne({ email });
    const existingAgent = await Agent.findOne({ email });

    if (existingCustomer || existingAgent) {
      await logUserActivity({ email, role, type: "signup", status: "failure" });
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    let newUser;

    if (role === "agent") {
      if (!employeeId) {
        return res.status(400).json({
          success: false,
          message: "Employee ID is required for agents",
        });
      }
      newUser = new Agent({ name, email, password: hashedPassword, employeeId });
    } else {
      newUser = new Customer({ name, email, password: hashedPassword });
    }

    await newUser.save();

    await logUserActivity({ email, role, type: "signup", status: "success" });

    // Return user details in the response
    res.status(201).json({
      success: true,
      message: "User created successfully",
      userId: newUser._id,
      user: {
        name: newUser.name,
        email: newUser.email,
        role: role,
        employeeId: newUser.employeeId || null,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);
    res.status(500).json({ success: false, message: "Error creating user" });
  }
});*/

// Signup Route
/*router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      await logUserActivity({ email, role, type: "signup", status: "failure" });
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newCustomer.save();

    // Log successful signup activity
    await logUserActivity({ email, role, type: "signup", status: "success" });

    // Notify the agent via email
    const agentEmail = "dinnuu576@gmail.com"; // Replace with the agent's email
    const emailSubject = "New Customer Signup";
    const emailText = `A new customer has signed up:\nName: ${name}\nEmail: ${email}`;

    await sendEmail(agentEmail, emailSubject, emailText);

    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    // Log failed signup activity
    await logUserActivity({ email, role, type: "signup", status: "failure" });

    res.status(500).json({ success: false, message: "Error during signup" });
  }
});



// ✅ LOGIN
/*router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  try {
    let user;
    if (role === "agent") {
      user = await Agent.findOne({ email });
    } else {
      user = await Customer.findOne({ email });
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id, role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
      token,
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Error during login" });
  }
});*/

// Login Route
router.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  console.log("Received login request:", { email, role });

  try {
    // Validate required fields
    if (!email || !password || !role) {
      console.log("Validation failed: Missing required fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Find user based on role
    const user =
      role === "agent"
        ? await Agent.findOne({ email })
        : await Customer.findOne({ email });

    if (!user) {
      console.log("User not found:", email);
      await logUserActivity({ email, role, type: "login", status: "failure" });
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password mismatch:", email);
      await logUserActivity({ email, role, type: "login", status: "failure" });
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Log successful login activity
    await logUserActivity({ email, role, type: "login", status: "success" });

    // Return token and user details
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);

    // Log failed login activity
    await logUserActivity({ email, role, type: "login", status: "failure" });

    // Return consistent error response
    res.status(500).json({ success: false, message: "Error during login" });
  }
});


/*router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("Received signup request:", { name, email, role });

  try {
    // Validate required fields
    if (!name || !email || !password || !role) {
      console.log("Validation failed: Missing required fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      console.log("User already exists:", email);
      await logUserActivity({ email, role, type: "signup", status: "failure" });
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newCustomer.save();
    console.log("New customer created:", newCustomer);

    // Log successful signup activity
    await logUserActivity({ email, role, type: "signup", status: "success" });

    // Notify the agent via email
    const agentEmail = process.env.AGENT_EMAIL; // Replace with the agent's email
    const emailSubject = "New Customer Signup";
    const emailText = `A new customer has signed up:\nName: ${name}\nEmail: ${email}`;

    try {
      await sendEmail(agentEmail, emailSubject, emailText);
      console.log("Notification email sent to agent");
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError);
    }

    // Return consistent response
    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    // Log failed signup activity
    await logUserActivity({ email, role, type: "signup", status: "failure" });

    // Return consistent error response
    res.status(500).json({ success: false, message: "Error during signup" });
  }
});
*/
/*router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  console.log("Received signup request:", { name, email, role });

  try {
    // Validate required fields
    if (!name || !email || !password || !role) {
      console.log("Validation failed: Missing required fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      console.log("User already exists:", email);
      await logUserActivity({ email, role, type: "signup", status: "failure" });
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new customer
    const newCustomer = new Customer({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newCustomer.save();
    console.log("New customer created:", newCustomer);

    // Log successful signup activity
    await logUserActivity({ email, role, type: "signup", status: "success" });

    // Notify the manager via email
    const managerEmail = process.env.MANAGER_EMAIL; // Manager's email
    const emailSubject = "New Customer Signup";
    const emailText = `A new customer has signed up:\nName: ${name}\nEmail: ${email}`;

    console.log("Sending email to manager:", managerEmail); // Log the recipient

    try {
      await sendEmail(managerEmail, emailSubject, emailText);
      console.log("Notification email sent to manager");
    } catch (emailError) {
      console.error("Failed to send email notification:", emailError.message);
    }

    // Return consistent response
    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    // Log failed signup activity
    await logUserActivity({ email, role, type: "signup", status: "failure" });

    // Return consistent error response
    res.status(500).json({ success: false, message: "Error during signup" });
  }
});
*/


// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password, role, employeeId } = req.body;

  console.log("Received signup request:", { name, email, role });

  try {
    // Validate required fields
    if (!name || !email || !password || !role) {
      console.log("Validation failed: Missing required fields");
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser =
      role === "agent"
        ? await Agent.findOne({ email })
        : await Customer.findOne({ email });

    if (existingUser) {
      console.log("User already exists:", email);
      await logUserActivity({ email, role, type: "signup", status: "failure" });
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user based on role
    let newUser;
    if (role === "agent") {
      if (!employeeId) {
        return res.status(400).json({ success: false, message: "Employee ID is required for agents" });
      }

      newUser = new Agent({
        name,
        email,
        password: hashedPassword,
        employeeId,
        role,
      });
    } else {
      newUser = new Customer({
        name,
        email,
        password: hashedPassword,
        role,
      });
    }

    await newUser.save();
    console.log(`New ${role} created:`, newUser);

    // Log successful signup activity
    await logUserActivity({ email, role, type: "signup", status: "success" });

    // Send email notification to manager ONLY for customer signups
    if (role === "customer") {
      const managerEmail = process.env.MANAGER_EMAIL; // Manager's email
      const emailSubject = "New Customer Signup";
      const emailText = `A new customer has signed up:\nName: ${name}\nEmail: ${email}`;

      console.log("Sending email to manager:", managerEmail); // Log the recipient

      try {
        await sendEmail(managerEmail, emailSubject, emailText);
        console.log("Notification email sent to manager");
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError.message);
      }
    }

    // Return consistent response
    res.status(201).json({
      success: true,
      message: "Signup successful",
      data: {
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error.message);

    // Log failed signup activity
    await logUserActivity({ email, role, type: "signup", status: "failure" });

    // Return consistent error response
    res.status(500).json({ success: false, message: "Error during signup" });
  }
});



// ✅ TOKEN VERIFY
router.get("/verify", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user;

    if (decoded.role === "agent") {
      user = await Agent.findById(decoded.userId).select("-password");
    } else {
      user = await Customer.findById(decoded.userId).select("-password");
    }

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    res.status(200).json({
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
    console.error("Verify error:", error.message);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
});

export default router;