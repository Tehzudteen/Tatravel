const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Session = require('../models/Session');


exports.register = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = req.body;
    const user = new User({ username, email, password, first_name, last_name });
    await user.save();

    // Automatically log in the user upon registration
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    await new Session({ user_id: user._id, status: 'success' }).save();

    res.json({ token, message: 'Registration successful' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
    await new Session({ user_id: user.id, status: 'success' }).save();
    res.json({ token, message: 'Login successful' }); // Modified response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};