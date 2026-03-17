const jwt = require('jsonwebtoken');

const generateToken = (userId) =>
  jwt.sign({ userId }, process.env.JWT_SECRET || 'test-secret', {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  });

module.exports = { generateToken };
