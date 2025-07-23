```javascript
const mongoose = require('mongoose');
const { generateReport } = require('../src/services/reportService');
const Transaction = require('../src/models/Transaction');

describe('Report Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should generate P&L report', async () => {
    const clientId = new mongoose.Types.ObjectId();
    await new Transaction({ clientId, amount: 1000, category: 'income', date: new Date() }).save();
    await new Transaction({ clientId, amount: -500, category: 'expense', date: new Date() }).save();
    const report = await generateReport({ clientId, type: 'p&l', period: '2025-07' });
    expect(report.data.profit).toBe(500);
  });
});
```