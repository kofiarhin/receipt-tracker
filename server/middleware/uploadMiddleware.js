const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { ApiError } = require('../utils/ApiError');

const ensureUploadDir = (uploadDir) => {
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
};

const makeUploadMiddleware = ({ uploadDir, maxUploadBytes }) => {
  ensureUploadDir(uploadDir);
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname || '').toLowerCase();
      const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      cb(null, safeName);
    },
  });

  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  return multer({
    storage,
    limits: { fileSize: maxUploadBytes },
    fileFilter: (_req, file, cb) => {
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new ApiError(400, 'Unsupported file type'));
      }
      return cb(null, true);
    },
  });
};

module.exports = { makeUploadMiddleware };
