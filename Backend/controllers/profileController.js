// profileController.js
const Profile = require('../models/Profile');
const User = require('../models/User');

// Create or Update Profile
exports.createOrUpdateProfile = async (req, res) => {
  try {
    const { bio, profile_picture, preferences } = req.body;

    // Find and update the profile for the authenticated user, or create one if it doesn't exist
    const profile = await Profile.findOneAndUpdate(
      { user_id: req.user.userId }, // User ID from the JWT
      { bio, profile_picture, preferences },
      { new: true, upsert: true } // Create if it doesn't exist
    );

    res.json({ profile, message: 'Profile saved successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Profile
exports.getProfile = async (req, res) => {
  try {
    // Populate user details from User collection
    const profile = await Profile.findOne({ user_id: req.user.userId }).populate('user_id', 'username email');
    if (!profile) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
