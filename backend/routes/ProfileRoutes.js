import express from 'express';
import Customer from '../models/Customer.js';
import Agent from '../models/Agent.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    console.log('No token provided in request');
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// GET /api/profile - Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    console.log('Fetching profile for user:', req.user);
    const userId = req.user.id;
    const userRole = req.user.role;

    let user;
    if (userRole === 'agent') {
      user = await Agent.findById(userId);
    } else {
      user = await Customer.findById(userId);
    }

    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    console.log('User found:', user);
    res.json({
      success: true,
      data: {
        fullName: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        role: user.role
      }
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch profile' });
  }
});

// PUT /api/profile - Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    console.log('Updating profile for user:', req.user);
    console.log('Update data:', req.body);
    
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
      console.log('User not found:', userId);
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update user fields
    if (fullName) user.name = fullName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    await user.save();
    console.log('User updated successfully:', user);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        fullName: user.name,
        email: user.email,
        phone: user.phone || '',
        address: user.address || '',
        role: user.role
      }
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ success: false, message: 'Failed to update profile' });
  }
});

export default router; 