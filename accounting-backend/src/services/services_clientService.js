const Client = require('../models/Client');
const Integration = require('../models/Integration');
const { PlaidApi, Configuration } = require('plaid');
const config = require('../config');
const logger = require('../utils/logger');
const { aiService } = require('../utils/aiService'); // Wait for build
const Bull = require('bullmq');

const plaidClient = new PlaidApi(new Configuration({
  basePath: 'https://sandbox.plaid.com', // Change to production later
  baseOptions: { headers: { 'PLAID-CLIENT-ID': config.plaid.clientId, 'PLAID-SECRET': config.plaid.secret } },
}));

const aiQueue = new Bull.Queue('aiQueue'); // For async AI

async function createClient(data) {
  const client = new Client(data);
  await client.save();
  return client;
}

async function addIntegration(clientId, type, provider, token) {
  const integration = new Integration({ clientId, type, provider, token });
  await integration.save();
  // Trigger sync if bank
  if (type === 'bank') {
    // Plaid sync logic - import transactions, queue AI categorization
    aiQueue.add('categorize', { clientId });
  }
  return integration;
}

// More functions: uploadParse (Tesseract for PDFs)

module.exports = { createClient, addIntegration };