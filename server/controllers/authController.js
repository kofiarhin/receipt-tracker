const User = require('../models/User');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { successResponse } = require('../utils/response');
const { generateToken } = require('../services/tokenService');

const sanitizeUser = (user) => ({ id: user._id.toString(), name: user.name, email: user.email });

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new ApiError(409, 'Email already in use');

  const user = await User.create({ name, email, password });
  const token = generateToken(user._id.toString());

  return successResponse(res, 201, 'Registration successful', { token, user: sanitizeUser(user) });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(401, 'Invalid credentials');

  const token = generateToken(user._id.toString());
  return successResponse(res, 200, 'Login successful', { token, user: sanitizeUser(user) });
});

const me = asyncHandler(async (req, res) => successResponse(res, 200, 'Profile fetched', { user: sanitizeUser(req.user) }));

module.exports = { register, login, me };
