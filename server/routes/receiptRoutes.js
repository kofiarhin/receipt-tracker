const express = require('express');
const { uploadReceipt } = require('../controllers/receiptController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/upload', authMiddleware, (req, res, next) => req.upload.single('receipt')(req, res, next), uploadReceipt);

module.exports = router;
