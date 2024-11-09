const mongoose = require('mongoose');

const travelSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  destination: String,
  start_date: Date,
  end_date: Date,
  details: String,
}, { timestamps: true });

module.exports = mongoose.model('Travel', travelSchema);