```javascript
const mongoose = require('mongoose');
const { setupUser, login } = require('../src/services/authService');
const User = require('../src/models/User');
const { mock } = require('jest-mock-extended');

describe('Auth Service', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should setup a new user', async () => {
    const user = await setupUser('test@example.com', 'securePass123');
    expect(user.email).toBe('test@example.com');
    expect(user._id).toBeDefined();
  });

  it('should login with correct credentials', async () => {
    await setupUser('test@example.com', 'securePass123');
    const token = await login('test@example.com', 'securePass123');
    expect(token).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/); // JWT format
  });

  it('should fail login with wrong password', async () => {
    await setupUser('test@example.com', 'securePass123');
    await expect(login('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
  });
});
```