const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('../config');

const integrationSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  type: { type: String, enum: ['bank', 'payment_processor'], required: true },
  provider: String,
  token: {
    type: String,
    required: true,
    set: function(value) {
      const cipher = crypto.createCipher('aes-256-cbc', config.jwtSecret);
      return cipher.update(value, 'utf8', 'hex') + cipher.final('hex');
    },
    get: function(value) {
      const decipher = crypto.createDecipher('aes-256-cbc', config.jwtSecret);
      return decipher.update(value, 'hex', 'utf8') + decipher.final('utf8');
    },
  },
  lastSync: Date,
});

integrationSchema.set('toJSON', { getters: true });
integrationSchema.set('toObject', { getters: true });

module.exports = mongoose.model('Integration', integrationSchema);