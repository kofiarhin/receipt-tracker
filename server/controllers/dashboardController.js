const Expense = require('../models/Expense');
const { asyncHandler } = require('../utils/asyncHandler');
const { successResponse } = require('../utils/response');

const getDashboardSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const [totals] = await Expense.aggregate([
    { $match: { userId } },
    {
      $group: {
        _id: null,
        totalSpent: { $sum: '$total' },
        receiptCount: { $sum: 1 },
        averageExpense: { $avg: '$total' },
      },
    },
  ]);

  const recentExpenses = await Expense.find({ userId }).sort('-date').limit(5);
  const latestReceipt = recentExpenses[0] || null;

  const monthly = await Expense.aggregate([
    { $match: { userId, date: { $ne: null } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m', date: '$date' } },
        total: { $sum: '$total' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return successResponse(res, 200, 'Dashboard summary fetched successfully', {
    totalSpent: totals?.totalSpent || 0,
    receiptCount: totals?.receiptCount || 0,
    averageExpense: totals?.averageExpense || 0,
    latestReceipt,
    recentExpenses,
    monthlySpendingTotals: monthly.map((item) => ({ month: item._id, total: item.total })),
  });
});

module.exports = { getDashboardSummary };
