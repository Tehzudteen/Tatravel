const express = require('express');
const { createOrUpdateProfile, getProfile } = require('../controllers/profileController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createOrUpdateProfile);
router.get('/', auth, getProfile);

module.exports = router; // Export the router here
