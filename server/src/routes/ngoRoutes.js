const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { getVolunteers, getActivities, getDonations, createActivity } = require('../controllers/ngoController');

// Get all volunteers (protected route for NGO staff only)
router.get('/volunteers', auth, authorize('ngo_staff'), async (req, res, next) => {
  try {
    console.log('User in route:', req.user); // Debug log
    const volunteers = await getVolunteers(req, res);
    console.log('Volunteers found:', volunteers.length); // Debug log
    res.json(volunteers);
  } catch (error) {
    console.error('Error in volunteers route:', error);
    next(error);
  }
});

// Get all activities (protected route for NGO staff only)
router.get('/activities', auth, authorize('ngo_staff'), async (req, res, next) => {
  try {
    console.log('User in route:', req.user); // Debug log
    const activities = await getActivities(req, res);
    console.log('Activities found:', activities.length); // Debug log
    res.json(activities);
  } catch (error) {
    console.error('Error in activities route:', error);
    next(error);
  }
});

// Create new activity (protected route for NGO staff only)
router.post('/activities', auth, authorize('ngo_staff'), async (req, res, next) => {
  try {
    console.log('Creating new activity:', req.body); // Debug log
    const activity = await createActivity(req, res);
    console.log('Activity created:', activity); // Debug log
    res.status(201).json(activity);
  } catch (error) {
    console.error('Error creating activity:', error);
    next(error);
  }
});

// Get all donations (protected route for NGO staff only)
router.get('/donations', auth, authorize('ngo_staff'), async (req, res, next) => {
  try {
    console.log('User in route:', req.user); // Debug log
    const donations = await getDonations(req, res);
    console.log('Donations found:', donations.length); // Debug log
    res.json(donations);
  } catch (error) {
    console.error('Error in donations route:', error);
    next(error);
  }
});

module.exports = router; 