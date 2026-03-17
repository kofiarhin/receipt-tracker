const { validationResult } = require('express-validator');
const { ApiError } = require('../utils/ApiError');

const validateRequest = (req, _res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(new ApiError(400, 'Validation failed', result.array().map((item) => item.msg)));
  }
  return next();
};

module.exports = { validateRequest };
