```javascript
const mongoose = require('mongoose');
const { runPayroll } = require('../src/services/payrollService');
const Payroll = require('../src/models/Payroll');
const Employee = require('../src/models/Employee');

describe('Payroll Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Payroll.deleteMany({});
    await Employee.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should run payroll', async () => {
    const employee = await new Employee({
      clientId: new mongoose.Types.ObjectId(),
      name: 'Jane',
      salary: 5000,
      taxProfile: { state: 'CA', federalStatus: 'single', allowances: 0 },
    }).save();
    const payroll = await runPayroll({
      clientId: employee.clientId,
      employeeId: employee._id,
      periodStart: new Date('2025-07-01'),
      periodEnd: new Date('2025-07-15'),
    });
    expect(payroll.grossPay).toBeDefined();
    expect(payroll.status).toBe('pending');
  });
});
```