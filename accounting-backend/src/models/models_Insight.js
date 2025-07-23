const mongoose = require('mongoose');

const insightSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' }, // Null for portfolio-wide
  type: String, // e.g., 'cashflow', 'anomaly'
  data: Object,
  generatedAt: { type: Date, default: Date.now },
});

insightSchema.index({ clientId: 1, generatedAt: -1 });

module.exports = mongoose.model('Insight', insightSchema);