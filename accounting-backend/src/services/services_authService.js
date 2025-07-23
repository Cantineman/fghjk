const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../config');
const logger = require('../utils/logger');
const transporter = require('../utils/emailTransporter'); // Add if needed, stub for now

async function setupUser(email, password) {
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, password });
    await user.save();
  } else {
    user.password = password;
    await user.save();
  }
  return user;
}

async function login(email, password) {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    // Send anomaly alert
    // transporter.sendMail({ ... });
    throw new Error('Invalid credentials');
  }
  return jwt.sign({ userId: user._id }, config.jwtSecret, { expiresIn: '1h' });
}

module.exports = { setupUser, login };