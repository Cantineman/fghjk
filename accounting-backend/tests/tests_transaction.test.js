```javascript
const mongoose = require('mongoose');
const { importTransactions, detectAnomalies } = require('../src/services/transactionService');
const Transaction = require('../src/models/Transaction');
const { mock } = require('jest-mock-extended');
const aiService = require('../src/utils/aiService');

jest.mock('../src/utils/aiService');

describe('Transaction Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Transaction.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should import transactions with AI categorization', async () => {
    aiService.categorizeTransaction.mockResolvedValue('expense');
    const clientId = new mongoose.Types.ObjectId();
    const txs = await importTransactions(clientId, [
      { amount: 100, date: new Date(), description: 'Coffee' },
    ]);
    expect(txs[0].category).toBe('expense');
    expect(txs[0].clientId.toString()).toBe(clientId.toString());
  });

  it('should handle AI categorization failure', async () => {
    aiService.categorizeTransaction.mockResolvedValue('other');
    const clientId = new mongoose.Types.ObjectId();
    const txs = await importTransactions(clientId, [
      { amount: 100, date: new Date(), description: 'Invalid' },
    ]);
    expect(txs[0].category).toBe('other');
  });
});
```