const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  businessType: String,
  taxId: String,
  integrations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Integration' }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Client', clientSchema);