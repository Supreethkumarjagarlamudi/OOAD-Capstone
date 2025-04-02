const Donation = require('../models/Donation');

// Get donor's donations
exports.getDonorDonations = async (req, res) => {
  try {
    console.log('Fetching donations for donor:', req.user._id);
    const donations = await Donation.find({ donor: req.user._id })
      .sort({ createdAt: -1 });
    
    console.log('Found donations:', donations.length);
    res.json(donations);
  } catch (error) {
    console.error('Error fetching donor donations:', error);
    res.status(500).json({ 
      message: 'Error fetching donations',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { amount, description, category, status } = req.body;

    // Validate required fields
    if (!amount || !description || !category) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Validate amount
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      return res.status(400).json({ message: 'Please provide a valid amount' });
    }

    // Create donation
    const donation = new Donation({
      donor: req.user._id,
      amount: numericAmount,
      description,
      category,
      status: status || (numericAmount > 1000 ? 'pending' : 'completed')
    });

    await donation.save();

    console.log('Donation created:', donation);
    res.status(201).json(donation);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ 
      message: 'Error creating donation',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}; 