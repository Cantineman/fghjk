const mongoose = require('mongoose');

const payrollSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  periodStart: Date,
  periodEnd: Date,
  grossPay: Number,
  deductions: { federalTax: Number, stateTax: Number, benefits: Number },
  netPay: Number,
  status: { type: String, enum: ['pending', 'paid', 'error'] },
  transactionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' },
  payslipUrl: String,
});

module.exports = mongoose.model('Payroll', payrollSchema);