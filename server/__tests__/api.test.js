const request = require('supertest');
const jwt = require('jsonwebtoken');

process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-secret';
process.env.JWT_EXPIRES_IN = '1d';
process.env.OCR_API_ENDPOINT = 'https://example.com/ocr';
process.env.OCR_API_KEY = 'key';
process.env.CLIENT_URL = 'http://localhost:5173';
process.env.PORT = '5000';
process.env.MONGO_URI = 'mongodb://localhost/test';

jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
}));

jest.mock('../models/Expense', () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  countDocuments: jest.fn(),
  aggregate: jest.fn(),
}));

const User = require('../models/User');
const Expense = require('../models/Expense');
const { createApp } = require('../app');

const app = createApp();

const makeToken = (userId = '507f1f77bcf86cd799439011') => jwt.sign({ userId }, process.env.JWT_SECRET);

describe('API with mocked persistence', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('register success', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: '507f1f77bcf86cd799439011', name: 'John', email: 'john@mail.com' });

    const response = await request(app).post('/api/auth/register').send({
      name: 'John',
      email: 'john@mail.com',
      password: 'password123',
    });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
  });

  test('login invalid credentials', async () => {
    User.findOne.mockResolvedValue(null);
    const response = await request(app).post('/api/auth/login').send({ email: 'a@mail.com', password: 'x' });
    expect(response.statusCode).toBe(401);
  });

  test('missing token protected route', async () => {
    const response = await request(app).get('/api/expenses');
    expect(response.statusCode).toBe(401);
  });

  test('get expenses paginated', async () => {
    const token = makeToken();
    User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue({ _id: '507f1f77bcf86cd799439011' }) });
    Expense.find.mockReturnValue({ sort: () => ({ skip: () => ({ limit: async () => [{ _id: '1', merchant: 'Store', total: 10 }] }) }) });
    Expense.countDocuments.mockResolvedValue(1);

    const response = await request(app).get('/api/expenses?page=1&limit=10').set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.data.meta.totalItems).toBe(1);
  });

  test('forbidden detail access', async () => {
    const token = makeToken('507f1f77bcf86cd799439011');
    User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue({ _id: '507f1f77bcf86cd799439011' }) });
    Expense.findById.mockResolvedValue({ _id: '507f1f77bcf86cd799439099', userId: { toString: () => '507f1f77bcf86cd799439012' } });

    const response = await request(app)
      .get('/api/expenses/507f1f77bcf86cd799439099')
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toBe(403);
  });
});
