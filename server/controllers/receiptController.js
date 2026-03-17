const fs = require("fs/promises");
const Expense = require("../models/Expense");
const { asyncHandler } = require("../utils/asyncHandler");
const { ApiError } = require("../utils/ApiError");
const { successResponse } = require("../utils/response");
const { performOcr } = require("../services/ocrService");
const { parseReceiptText } = require("../services/receiptParserService");

const uploadReceipt = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new ApiError(400, "Receipt image is required");
  }

  let rawText = "";
  let ocrProvider = process.env.OCR_PROVIDER || "google-vision";
  let parsed = {
    total: 0,
    date: null,
    merchant: "Unknown Merchant",
    currency: "USD",
    items: [],
    extractionStatus: "failed",
  };

  try {
    const ocrResult = await performOcr({
      filePath: req.file.path,
    });

    rawText = ocrResult?.text || "";
    ocrProvider = ocrResult?.provider || ocrProvider;
    parsed = parseReceiptText(rawText);
  } catch (_error) {
    parsed.extractionStatus = "failed";
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
    ocrProvider,
  });

  await fs.unlink(req.file.path).catch(() => null);

  return successResponse(res, 201, "Receipt processed successfully", {
    expense,
  });
});

module.exports = { uploadReceipt };
