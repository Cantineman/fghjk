const Transaction = require('../models/Transaction');
const { categorizeTransaction } = require('../utils/aiService');
const logger = require('../utils/logger');

async function importTransactions(clientId, data) {
  const transactions = data.map(async (tx) => {
    tx.category = await categorizeTransaction(tx.description);
    tx.clientId = clientId;
    return new Transaction(tx).save();
  });
  return Promise.all(transactions);
}

async function detectAnomalies(clientId) {
  const txs = await Transaction.find({ clientId }).sort({ date: -1 }).limit(100);
  // AI logic for anomalies, e.g., unusual amounts
  return txs; // Stub
}

module.exports = { importTransactions, detectAnomalies };