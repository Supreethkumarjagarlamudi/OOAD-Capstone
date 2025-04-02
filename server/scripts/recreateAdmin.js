require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../src/models/User');

const recreateAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Delete existing admin
    await User.deleteOne({ email: 'admin@ngo.com' });
    console.log('Deleted existing admin user');

    // Create new admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@ngo.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user recreated successfully:', {
      id: admin._id,
      email: admin.email,
      role: admin.role
    });
  } catch (error) {
    console.error('Error recreating admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
};

recreateAdmin(); 