const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor', required: true },
  amount: Number,
  dueDate: Date,
  status: { type: String, enum: ['paid', 'owed'] },
  paidDate: Date,
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
});

module.exports = mongoose.model('Bill', billSchema);