const express = require('express');
const { createTravel, getTravelDetails } = require('../controllers/TravelController');
const router = express.Router();

router.post('/', createTravel);
router.get('/:travelId/details', getTravelDetails);

module.exports = router;
