```javascript
const mongoose = require('mongoose');
const { createClient, addIntegration } = require('../src/services/clientService');
const Client = require('../src/models/Client');
const Integration = require('../src/models/Integration');
const { mock } = require('jest-mock-extended');

describe('Client Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await Client.deleteMany({});
    await Integration.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should create a client', async () => {
    const client = await createClient({ name: 'Acme Corp', businessType: 'Retail', taxId: '12345' });
    expect(client.name).toBe('Acme Corp');
    expect(client._id).toBeDefined();
  });

  it('should add an integration', async () => {
    const client = await createClient({ name: 'Acme Corp' });
    const integration = await addIntegration(client._id, 'bank', 'Plaid', 'mockToken');
    expect(integration.clientId.toString()).toBe(client._id.toString());
    expect(integration.type).toBe('bank');
  });
});
```