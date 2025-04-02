const User = require('../models/User');
const Activity = require('../models/Activity');
const Donation = require('../models/Donation');

// Get all volunteers
const getVolunteers = async (req, res) => {
  try {
    console.log('Fetching volunteers...');
    const volunteers = await User.find({ role: 'volunteer' });
    console.log('Found volunteers:', volunteers);
    return volunteers;
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    throw error;
  }
};

// Get all activities
const getActivities = async (req, res) => {
  try {
    console.log('Fetching activities...');
    const activities = await Activity.find();
    console.log('Found activities:', activities);
    return activities;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};

// Create new activity
const createActivity = async (req, res) => {
  try {
    console.log('Creating activity with data:', req.body);
    const { title, description, date, location, requiredVolunteers } = req.body;

    // Validate required fields
    if (!title || !description || !date || !location || !requiredVolunteers) {
      throw new Error('All fields are required');
    }

    // Create new activity
    const activity = new Activity({
      title,
      description,
      date,
      location,
      requiredVolunteers,
      createdBy: req.user._id, // Set the creator as the logged-in NGO staff
      status: 'active'
    });

    // Save the activity
    const savedActivity = await activity.save();
    console.log('Activity created successfully:', savedActivity);
    return savedActivity;
  } catch (error) {
    console.error('Error creating activity:', error);
    throw error;
  }
};

// Get all donations
const getDonations = async (req, res) => {
  try {
    console.log('Fetching donations...');
    const donations = await Donation.find();
    console.log('Found donations:', donations);
    return donations;
  } catch (error) {
    console.error('Error fetching donations:', error);
    throw error;
  }
};

module.exports = {
  getVolunteers,
  getActivities,
  getDonations,
  createActivity
}; 