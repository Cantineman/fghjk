const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  name: String,
  role: String,
  salary: Number,
  hourlyRate: Number,
  taxProfile: { state: String, federalStatus: String, allowances: Number },
  bankDetails: { account: String, routing: String }, // Encrypt in service
  payrollHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Payroll' }],
});

module.exports = mongoose.model('Employee', employeeSchema);