const express = require('express');
const { param } = require('express-validator');
const { getExpenses, getExpenseById, deleteExpense } = require('../controllers/expenseController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { validateRequest } = require('../middleware/validateRequest');

const router = express.Router();

router.use(authMiddleware);
router.get('/', getExpenses);
router.get('/:id', [param('id').isMongoId()], validateRequest, getExpenseById);
router.delete('/:id', [param('id').isMongoId()], validateRequest, deleteExpense);

module.exports = router;
