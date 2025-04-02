const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { getDonorDonations, createDonation } = require('../controllers/donorController');

// Get donor's donations (protected route for donors only)
router.get('/donations', auth, authorize('donor'), async (req, res, next) => {
  try {
    console.log('User fetching donations:', req.user);
    const donations = await getDonorDonations(req, res);
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    next(error);
  }
});

// Create a new donation (protected route for donors only)
router.post('/donations', auth, authorize('donor'), async (req, res, next) => {
  try {
    console.log('User creating donation:', req.user);
    const donation = await createDonation(req, res);
    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    next(error);
  }
});

module.exports = router; 