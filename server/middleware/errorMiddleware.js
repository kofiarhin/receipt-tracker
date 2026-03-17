const { ApiError } = require('../utils/ApiError');
const { errorResponse } = require('../utils/response');

const errorMiddleware = (error, _req, res, _next) => {
  if (error instanceof ApiError) {
    return errorResponse(res, error.statusCode, error.message, error.errors);
  }

  if (error.name === 'ValidationError') {
    return errorResponse(
      res,
      400,
      'Validation failed',
      Object.values(error.errors).map((err) => err.message),
    );
  }

  if (error.code === 11000) {
    return errorResponse(res, 409, 'Duplicate resource', ['Duplicate key error']);
  }

  return errorResponse(res, 500, 'Internal server error');
};

module.exports = { errorMiddleware };
