const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  login_time: { type: Date, default: Date.now },
  logout_time: Date,
  status: { type: String, enum: ['success', 'fail'], required: true },
  ip_address: String,
});

module.exports = mongoose.model('Session', sessionSchema);