const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const { joinActivity } = require('../controllers/activityController');

// Join an activity (protected route for volunteers only)
router.post('/:id/join', auth, authorize('volunteer'), async (req, res, next) => {
  try {
    console.log('User joining activity:', req.user); // Debug log
    const activity = await joinActivity(req.params.id, req.user._id);
    console.log('Activity joined successfully:', activity); // Debug log
    res.json(activity);
  } catch (error) {
    console.error('Error joining activity:', error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 