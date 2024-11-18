const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');

// Register Function
exports.register = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name, avatarUrl, coverPhoto } = req.body;

    // Create new user
    const user = new User({ username, email, password, first_name, last_name, avatarUrl, coverPhoto });
    await user.save();

    // Automatically log in the user upon registration
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await new Session({ user_id: user._id, status: 'success' }).save();

    res.json({ token, message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login Function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user in the database
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token and log session
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    await new Session({ user_id: user.id, status: 'success' }).save();

    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get User Profile Function
exports.getProfile = async (req, res) => {
  try {
    const userId = req.userId; // Assuming middleware sets `req.userId` from token

    // Fetch user data excluding sensitive fields like password
    const user = await User.findById(userId, '-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
