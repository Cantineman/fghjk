const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: Number,
  owed: Number,
  dueDate: Date,
  status: { type: String, enum: ['paid', 'owed'] },
  project: String,
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
});

module.exports = mongoose.model('Invoice', invoiceSchema);