import express from 'express';
import Policy from '../models/Policy.js';

const router = express.Router();

// Get all policies
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all policies...');
    const policies = await Policy.find();
    console.log(`Found ${policies.length} policies`);
    res.json(policies);
  } catch (error) {
    console.error('Error fetching policies:', error);
    res.status(500).json({ 
      message: 'Failed to fetch policies',
      error: error.message 
    });
  }
});

// Get a specific policy by ID
router.get('/:policyId', async (req, res) => {
  try {
    console.log('Fetching policy:', req.params.policyId);
    const policy = await Policy.findOne({ policyId: req.params.policyId });
    if (!policy) {
      console.log('Policy not found:', req.params.policyId);
      return res.status(404).json({ message: 'Policy not found' });
    }
    console.log('Policy found:', policy.policyId);
    res.json(policy);
  } catch (error) {
    console.error('Error fetching policy:', error);
    res.status(500).json({ 
      message: 'Failed to fetch policy',
      error: error.message 
    });
  }
});

// Create a new policy
router.post('/', async (req, res) => {
  const policy = new Policy({
    policyId: req.body.policyId,
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    premium: req.body.premium,
    features: req.body.features,
    durations: req.body.durations,
    riders: req.body.riders
  });

  try {
    const newPolicy = await policy.save();
    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a policy
router.patch('/:policyId', async (req, res) => {
  try {
    const policy = await Policy.findOne({ policyId: req.params.policyId });
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    Object.keys(req.body).forEach(key => {
      policy[key] = req.body[key];
    });

    const updatedPolicy = await policy.save();
    res.json(updatedPolicy);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a policy
router.delete('/:policyId', async (req, res) => {
  try {
    const policy = await Policy.findOne({ policyId: req.params.policyId });
    if (!policy) {
      return res.status(404).json({ message: 'Policy not found' });
    }

    await Policy.deleteOne({ _id: policy._id });
    res.json({ message: 'Policy deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 