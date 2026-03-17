const mongoose = require('mongoose');

const expenseItemSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    price: { type: Number, min: 0 },
  },
  { _id: false },
);

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    merchant: { type: String, trim: true, default: 'Unknown Merchant', index: true },
    date: { type: Date, index: true },
    total: { type: Number, min: 0, default: 0 },
    currency: { type: String, default: 'USD' },
    items: { type: [expenseItemSchema], default: [] },
    rawText: { type: String, default: '' },
    ocrProvider: { type: String, default: 'mock-ocr' },
    extractionStatus: { type: String, enum: ['complete', 'partial', 'failed'], default: 'partial' },
  },
  { timestamps: true },
);

module.exports = mongoose.model('Expense', expenseSchema);
