import Enrollment from '../models/Enrollment.js';
import { v4 as uuidv4 } from 'uuid';

// Create new enrollment
export const createEnrollment = async (req, res) => {
  try {
    const { policyId, isProminent } = req.body;

    if (!isProminent) {
      return res.status(200).json({
        success: false,
        message: "We will contact you soon regarding your interest in our policy."
      });
    }

    const enrollment = new Enrollment({
      enrollmentId: `ENR-${uuidv4().slice(0, 8)}`,
      policyId,
      agentId: null // Will be updated when an agent claims the customer
    });

    await enrollment.save();

    res.status(201).json({
      success: true,
      data: enrollment,
      message: "Enrollment created successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating enrollment",
      error: error.message
    });
  }
};

// Get all enrollments
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({});
    res.status(200).json({
      success: true,
      data: enrollments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enrollments",
      error: error.message
    });
  }
};

// Get single enrollment
export const getEnrollment = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const enrollment = await Enrollment.findOne({ enrollmentId });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching enrollment",
      error: error.message
    });
  }
};

// Assign agent to enrollment
export const assignAgent = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { agentId } = req.body;

    // First check if the enrollment exists and is not already claimed
    const enrollment = await Enrollment.findOne({ enrollmentId });

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found"
      });
    }

    if (enrollment.agentId) {
      return res.status(400).json({
        success: false,
        message: "This customer has already been claimed by another agent"
      });
    }

    // Use findOneAndUpdate with a condition to prevent race conditions
    const updatedEnrollment = await Enrollment.findOneAndUpdate(
      { enrollmentId, agentId: null }, // Only update if not already claimed
      { agentId },
      { new: true }
    );

    if (!updatedEnrollment) {
      return res.status(400).json({
        success: false,
        message: "Failed to claim customer. Please try again."
      });
    }

    res.status(200).json({
      success: true,
      data: updatedEnrollment,
      message: "Agent assigned successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error assigning agent",
      error: error.message
    });
  }
};

// Update enrollment notes
export const updateNotes = async (req, res) => {
  try {
    const { enrollmentId } = req.params;
    const { notes, agentId } = req.body;

    const enrollment = await Enrollment.findOneAndUpdate(
      { enrollmentId, agentId }, // Only update if the agent matches
      { notes },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found or unauthorized"
      });
    }

    res.status(200).json({
      success: true,
      data: enrollment,
      message: "Notes updated successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating notes",
      error: error.message
    });
  }
}; 