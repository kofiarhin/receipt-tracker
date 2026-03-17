const fs = require('fs/promises');
const Expense = require('../models/Expense');
const { asyncHandler } = require('../utils/asyncHandler');
const { ApiError } = require('../utils/ApiError');
const { successResponse } = require('../utils/response');
const { performOcr } = require('../services/ocrService');
const { parseReceiptText } = require('../services/receiptParserService');

const uploadReceipt = asyncHandler(async (req, res) => {
  if (!req.file) throw new ApiError(400, 'Receipt image is required');

  let rawText = '';
  let parsed = { total: 0, date: null, merchant: 'Unknown Merchant', currency: 'USD', items: [], extractionStatus: 'failed' };

  try {
    rawText = await performOcr({
      filePath: req.file.path,
      endpoint: process.env.OCR_API_ENDPOINT,
      apiKey: process.env.OCR_API_KEY,
    });
    parsed = parseReceiptText(rawText || '');
  } catch (_error) {
    parsed.extractionStatus = 'failed';
  }

  const expense = await Expense.create({
    userId: req.user._id,
    merchant: parsed.merchant,
    date: parsed.date,
    total: parsed.total,
    currency: parsed.currency,
    items: parsed.items,
    rawText,
    extractionStatus: parsed.extractionStatus,
    ocrProvider: process.env.OCR_API_ENDPOINT?.includes('example.com') ? 'mock-ocr' : 'external-ocr',
  });

  await fs.unlink(req.file.path).catch(() => null);

  return successResponse(res, 201, 'Receipt processed successfully', { expense });
});

module.exports = { uploadReceipt };
