const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const adminRoutes = require('./adminRoutes');
const ngoRoutes = require('./ngoRoutes');
const activityRoutes = require('./activityRoutes');
const volunteerRoutes = require('./volunteerRoutes');
const donorRoutes = require('./donorRoutes');

router.use('/auth', authRoutes);
router.use('/admin', adminRoutes);
router.use('/ngo', ngoRoutes);
router.use('/activities', activityRoutes);
router.use('/volunteer', volunteerRoutes);
router.use('/donor', donorRoutes);

module.exports = router; 