const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const checkAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ngo-management');
    console.log('Connected to MongoDB');

    const admin = await User.findOne({ email: 'admin@ngo.com' });
    if (admin) {
      console.log('Admin user found:', {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        id: admin._id
      });
    } else {
      console.log('Admin user not found');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin user:', error);
    process.exit(1);
  }
};

checkAdmin(); 