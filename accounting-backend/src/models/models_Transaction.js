const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: String,
  category: String, // AI-set
  status: { type: String, enum: ['paid', 'owed', 'pending'] },
  vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  project: String,
}, { timestamps: true });

transactionSchema.index({ clientId: 1, date: -1 }); // For fast queries

transactionSchema.post('save', async function(doc) {
  // Hook for AI categorization if category null - call aiService in services
});

module.exports = mongoose.model('Transaction', transactionSchema);