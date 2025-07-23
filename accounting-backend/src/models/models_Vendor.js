const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: String,
  contact: String,
  bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bill' }],
});

module.exports = mongoose.model('Vendor', vendorSchema);