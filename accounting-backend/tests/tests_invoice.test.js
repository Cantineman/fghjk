```javascript
const mongoose = require('mongoose');
const { createInvoice } = require('../src/services/invoiceService');
const Invoice = require('../src/models/Invoice');
const Customer = require('../src/models/Customer');

describe('Invoice Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Invoice.deleteMany({});
    await Customer.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create an invoice', async () => {
    const customer = await new Customer({ clientId: new mongoose.Types.ObjectId(), name: 'Client A' }).save();
    const invoice = await createInvoice({
      customerId: customer._id,
      amount: 500,
      dueDate: new Date(),
      project: 'Project X',
    });
    expect(invoice.amount).toBe(500);
    expect(invoice.status).toBe('owed');
  });
});
```