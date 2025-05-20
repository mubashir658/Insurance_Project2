import express from 'express';
   import Customer from '../models/Customer.js';
   import Agent from '../models/Agent.js';
   import UserActivity from '../models/UserActivity.js';
   import bcrypt from 'bcryptjs';
   import jwt from 'jsonwebtoken';

   const router = express.Router();

   const logActivity = async (email, role, type, status) => {
     try {
       const activity = new UserActivity({ email, role, type, status, timestamp: new Date() });
       await activity.save();
     } catch (error) {
       console.error('Error logging activity:', error);
     }
   };

   router.post('/signup', async (req, res) => {
     try {
       const { fullName, email, employeeId, password, role } = req.body;
       console.log('Signup request:', { fullName, email, employeeId, role });

       if (!fullName || !email || !password || !role) {
         await logActivity(email, role, 'signup', 'failure');
         return res.status(400).json({ success: false, message: 'All required fields must be provided' });
       }

       if (password.length < 6) {
         await logActivity(email, role, 'signup', 'failure');
         return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
       }

       const hashedPassword = await bcrypt.hash(password, 10);

       if (role === 'agent') {
         if (!employeeId) {
           await logActivity(email, role, 'signup', 'failure');
           return res.status(400).json({ success: false, message: 'Employee ID is required for agents' });
         }
         const existingAgent = await Agent.findOne({ $or: [{ email }, { employeeId }] });
         if (existingAgent) {
           await logActivity(email, role, 'signup', 'failure');
           return res.status(400).json({ success: false, message: 'Email or Employee ID already exists' });
         }
         const agent = new Agent({ name: fullName, email, employeeId, password: hashedPassword, role });
         await agent.save();
         await logActivity(email, role, 'signup', 'success');
         return res.status(201).json({ success: true, message: 'Signup successful', data: { name: fullName, email, role } });
       } else {
         const existingCustomer = await Customer.findOne({ email });
         if (existingCustomer) {
           await logActivity(email, role, 'signup', 'failure');
           return res.status(400).json({ success: false, message: 'Email already exists' });
         }
         const customer = new Customer({ name: fullName, email, password: hashedPassword, role });
         await customer.save();
         await logActivity(email, role, 'signup', 'success');
         return res.status(201).json({ success: true, message: 'Signup successful', data: { name: fullName, email, role } });
       }
     } catch (error) {
       console.error('Signup error:', error);
       await logActivity(req.body.email || 'unknown', req.body.role || 'unknown', 'signup', 'failure');
       return res.status(500).json({ success: false, message: 'Error creating user' });
     }
   });

   router.post('/login', async (req, res) => {
     try {
       const { email, password, role } = req.body;
       console.log('Login request:', { email, role });

       if (!email || !password || !role) {
         await logActivity(email, role, 'login', 'failure');
         return res.status(400).json({ success: false, message: 'Email, password, and role are required' });
       }

       let user;
       if (role === 'agent') {
         user = await Agent.findOne({ email });
       } else {
         user = await Customer.findOne({ email });
       }

       if (!user) {
         await logActivity(email, role, 'login', 'failure');
         return res.status(401).json({ success: false, message: 'User not found' });
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if (!isMatch) {
         await logActivity(email, role, 'login', 'failure');
         return res.status(401).json({ success: false, message: 'Invalid credentials' });
       }

       const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
       console.log('Generated token:', token);

       await logActivity(email, role, 'login', 'success');
       return res.status(200).json({
         success: true,
         message: 'Login successful',
         data: { name: user.name, email: user.email, role: user.role },
         token
       });
     } catch (error) {
       console.error('Login error:', error);
       await logActivity(req.body.email || 'unknown', req.body.role || 'unknown', 'login', 'failure');
       return res.status(500).json({ success: false, message: 'Error during login' });
     }
   });

   export default router;