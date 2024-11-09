const mongoose = require('mongoose');

const travelDetailSchema = new mongoose.Schema({
  travel_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Travel', required: true },
  activity_name: String,
  description: String,
  location: String,
  timestamp: Date,
  cost: Number,
});

module.exports = mongoose.model('TravelDetail', travelDetailSchema);