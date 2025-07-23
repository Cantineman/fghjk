```javascript
const mongoose = require('mongoose');
const { createBill } = require('../src/services/expenseService');
const Bill = require('../src/models/Bill');
const Vendor = require('../src/models/Vendor');

describe('Expense Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Bill.deleteMany({});
    await Vendor.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a bill', async () => {
    const vendor = await new Vendor({ clientId: new mongoose.Types.ObjectId(), name: 'Vendor X' }).save();
    const bill = await createBill({
      vendorId: vendor._id,
      amount: 200,
      dueDate: new Date(),
    });
    expect(bill.amount).toBe(200);
    expect(bill.status).toBe('owed');
  });
});
```