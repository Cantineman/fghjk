const { OpenAI } = require('openai');
const config = require('../config');
const logger = require('./logger');

const openai = new OpenAI({ apiKey: config.openaiKey });

async function categorizeTransaction(description) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: `Categorize this transaction description into expense, income, or other: "${description}"` }],
    });
    return response.choices[0].message.content.trim();
  } catch (error) {
    logger.error(`AI categorization error: ${error.message}`);
    return 'other'; // Fallback
  }
}

// Add more AI functions as needed, e.g., predictCashflow(data)

module.exports = { categorizeTransaction };