const Expense = require('../models/Expense');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { successResponse } = require('../utils/response');

const getExpenses = asyncHandler(async (req, res) => {
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 10));
  const sort = req.query.sort === 'oldest' ? 'date' : '-date';
  const query = { userId: req.user._id };

  if (req.query.search) query.merchant = { $regex: req.query.search, $options: 'i' };
  if (req.query.merchant) query.merchant = { $regex: `^${req.query.merchant}$`, $options: 'i' };
  if (req.query.from || req.query.to) {
    query.date = {};
    if (req.query.from) query.date.$gte = new Date(req.query.from);
    if (req.query.to) query.date.$lte = new Date(req.query.to);
  }

  const [items, totalItems] = await Promise.all([
    Expense.find(query).sort(sort).skip((page - 1) * limit).limit(limit),
    Expense.countDocuments(query),
  ]);

  return successResponse(res, 200, 'Expenses fetched successfully', {
    items,
    meta: { page, limit, totalItems, totalPages: Math.max(1, Math.ceil(totalItems / limit)) },
  });
});

const getExpenseById = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) throw new ApiError(404, 'Expense not found');
  if (expense.userId.toString() !== req.user._id.toString()) throw new ApiError(403, 'Forbidden');

  return successResponse(res, 200, 'Expense fetched successfully', { expense });
});

const deleteExpense = asyncHandler(async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  if (!expense) throw new ApiError(404, 'Expense not found');
  if (expense.userId.toString() !== req.user._id.toString()) throw new ApiError(403, 'Forbidden');
  await expense.deleteOne();

  return successResponse(res, 200, 'Expense deleted successfully', { expenseId: req.params.id });
});

module.exports = { getExpenses, getExpenseById, deleteExpense };
