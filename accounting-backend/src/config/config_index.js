const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const configSchema = Joi.object({
  MONGO_URI: Joi.string().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  PORT: Joi.number().default(3000),
  EMAIL_USER: Joi.string().email().required(),
  EMAIL_PASS: Joi.string().required(),
  OPENAI_API_KEY: Joi.string().required(),
  PLAID_CLIENT_ID: Joi.string().required(),
  PLAID_SECRET: Joi.string().required(),
  STRIPE_SECRET_KEY: Joi.string().required(),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
}).unknown();

const { error, value: envVars } = configSchema.validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  mongoUri: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
  port: envVars.PORT,
  email: { user: envVars.EMAIL_USER, pass: envVars.EMAIL_PASS },
  openaiKey: envVars.OPENAI_API_KEY,
  plaid: { clientId: envVars.PLAID_CLIENT_ID, secret: envVars.PLAID_SECRET },
  stripeKey: envVars.STRIPE_SECRET_KEY,
  env: envVars.NODE_ENV,
};