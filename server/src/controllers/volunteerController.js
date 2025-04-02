const Activity = require('../models/Activity');

// Get all activities for a volunteer
const getVolunteerActivities = async (userId) => {
  try {
    console.log('Fetching activities for user:', userId); // Debug log
    const activities = await Activity.find({
      $or: [
        { volunteers: userId },
        { status: 'active' }
      ]
    }).populate('createdBy', 'name email');
    
    console.log('Found activities:', activities.length); // Debug log
    return activities;
  } catch (error) {
    console.error('Error in getVolunteerActivities:', error);
    throw error;
  }
};

// Get total volunteer hours for a user
const getVolunteerHours = async (userId) => {
  try {
    console.log('Fetching hours for user:', userId); // Debug log
    const activities = await Activity.find({
      volunteers: userId,
      status: 'completed'
    });
    
    // For now, we'll just count completed activities as 2 hours each
    // In a real application, you might want to track actual hours spent
    const totalHours = activities.length * 2;
    
    console.log('Total hours:', totalHours); // Debug log
    return totalHours;
  } catch (error) {
    console.error('Error in getVolunteerHours:', error);
    throw error;
  }
};

module.exports = {
  getVolunteerActivities,
  getVolunteerHours
}; 