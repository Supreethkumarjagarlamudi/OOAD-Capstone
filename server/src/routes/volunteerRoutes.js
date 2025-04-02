const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { getVolunteerActivities, getVolunteerHours } = require('../controllers/volunteerController');

// Get all activities (protected route for volunteers only)
router.get('/activities', auth, authorize('volunteer'), async (req, res, next) => {
  try {
    console.log('User fetching activities:', req.user); // Debug log
    const activities = await getVolunteerActivities(req.user._id);
    console.log('Activities found:', activities.length); // Debug log
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    next(error);
  }
});

// Get volunteer hours (protected route for volunteers only)
router.get('/hours', auth, authorize('volunteer'), async (req, res, next) => {
  try {
    console.log('User fetching hours:', req.user); // Debug log
    const hours = await getVolunteerHours(req.user._id);
    console.log('Hours found:', hours); // Debug log
    res.json({ totalHours: hours });
  } catch (error) {
    console.error('Error fetching hours:', error);
    next(error);
  }
});

module.exports = router; 