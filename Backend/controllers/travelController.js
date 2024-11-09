const Travel = require('../models/Travel');
const TravelDetail = require('../models/TravelDetail');

exports.createTravel = async (req, res) => {
  try {
    const { destination, start_date, end_date, details } = req.body;
    const travel = new Travel({ ...req.body, user_id: req.user.userId });
    await travel.save();
    res.json(travel);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTravelDetails = async (req, res) => {
  try {
    const travelDetails = await TravelDetail.find({ travel_id: req.params.travelId });
    res.json(travelDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
