import express from 'express';
import Customer from '../models/Customer.js';
import Agent from '../models/Agent.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// PUT /api/profile - Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { fullName, phone, address } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    let user;
    if (userRole === 'agent') {
      user = await Agent.findById(userId);
    } else {
      user = await Customer.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user fields
    user.name = fullName;
    user.phone = phone;
    user.address = address;

    await user.save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        fullName: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

export default router; 