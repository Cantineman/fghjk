const { setupUser, login } = require('../services/authService');
const Joi = require('joi');
const logger = require('../utils/logger');

const setupSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

async function setup(req, res) {
  const { error } = setupSchema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  try {
    const user = await setupUser(req.body.email, req.body.password);
    res.json({ message: 'User setup complete', userId: user._id });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ error: err.message });
  }
}

async function loginController(req, res) {
  try {
    const token = await login(req.body.email, req.body.password);
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = { setup, loginController };