const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: String,
  projects: [String],
  invoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }],
});

module.exports = mongoose.model('Customer', customerSchema);