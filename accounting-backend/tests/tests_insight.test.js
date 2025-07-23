```javascript
const mongoose = require('mongoose');
const { generateInsight } = require('../src/services/insightService');
const Insight = require('../src/models/Insight');

describe('Insight Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Insight.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should generate portfolio insight', async () => {
    const insight = await generateInsight({ type: 'cashflow', clientIds: [] });
    expect(insight.type).toBe('cashflow');
    expect(insight.data).toBeDefined();
  });
});
```