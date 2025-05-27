import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// Ensure environment variables are loaded
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

const authMiddleware = (req, res, next) => {
  console.log('Auth middleware - Headers:', req.headers);
  
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log('No authorization header provided');
    return res.status(401).json({ message: 'No authorization header provided' });
  }
  
  const token = authHeader.split(' ')[1];
  if (!token) {
    console.log('No token provided in authorization header');
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    console.log('Verifying token with secret:', JWT_SECRET.substring(0, 3) + '...');
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Token verified successfully. User:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    res.status(401).json({ message: 'Invalid token: ' + error.message });
  }
};

export default authMiddleware;