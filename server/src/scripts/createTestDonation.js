const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Donation = require('../models/Donation');

dotenv.config();

const createTestDonation = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ngo-management');
    console.log('Connected to MongoDB');

    // Find a donor and an NGO
    const donor = await User.findOne({ role: 'donor' });
    const ngo = await User.findOne({ role: 'ngo_staff' });

    if (!donor || !ngo) {
      console.log('Please create a donor and an NGO first');
      process.exit(1);
    }

    // Create a test donation
    const donation = new Donation({
      donor: donor._id,
      ngo: ngo._id,
      amount: 1000,
      type: 'monetary',
      status: 'completed',
      description: 'Test donation'
    });

    await donation.save();
    console.log('Test donation created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createTestDonation(); 