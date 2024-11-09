const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: String,
  profile_picture: String,
  preferences: Object, // Stores JSON-like data
}, { timestamps: true });

module.exports = mongoose.model('Profile', profileSchema);