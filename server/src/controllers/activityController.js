const Activity = require('../models/Activity');

// Join an activity
const joinActivity = async (activityId, userId) => {
  try {
    console.log('Finding activity:', activityId); // Debug log
    const activity = await Activity.findById(activityId);
    
    if (!activity) {
      throw new Error('Activity not found');
    }

    if (activity.status !== 'active') {
      throw new Error('Activity is not active');
    }

    // Check if user is already in volunteers array
    if (activity.volunteers.includes(userId)) {
      throw new Error('Already joined this activity');
    }

    // Check if activity is full
    if (activity.volunteers.length >= activity.requiredVolunteers) {
      throw new Error('Activity is full');
    }

    // Add user to volunteers array
    activity.volunteers.push(userId);
    const updatedActivity = await activity.save();
    
    console.log('Activity updated:', updatedActivity); // Debug log
    return updatedActivity;
  } catch (error) {
    console.error('Error in joinActivity:', error);
    throw error;
  }
};

module.exports = {
  joinActivity
}; 