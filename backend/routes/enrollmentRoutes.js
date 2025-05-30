import express from 'express';
import { 
  createEnrollment, 
  getEnrollments, 
  getEnrollment,
  assignAgent,
  updateNotes 
} from '../controllers/enrollmentController.js';

const router = express.Router();

// Create new enrollment
router.post('/', createEnrollment);

// Get all enrollments
router.get('/', getEnrollments);

// Get single enrollment
router.get('/:enrollmentId', getEnrollment);

// Assign agent to enrollment
router.put('/:enrollmentId/assign-agent', assignAgent);

// Update enrollment notes
router.put('/:enrollmentId/notes', updateNotes);

export default router; 