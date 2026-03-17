const REQUIRED_ENV_KEYS = [
  'PORT',
  'MONGO_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'OCR_API_KEY',
  'OCR_API_ENDPOINT',
  'CLIENT_URL',
];

const loadEnv = () => {
  const missing = REQUIRED_ENV_KEYS.filter((key) => !process.env[key]);
  if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || 5000),
    mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/receipt-tracker-test',
    jwtSecret: process.env.JWT_SECRET || 'test-secret',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    ocrApiKey: process.env.OCR_API_KEY || 'test-ocr-key',
    ocrApiEndpoint: process.env.OCR_API_ENDPOINT || 'https://example.com/ocr',
    clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
    uploadDir: process.env.UPLOAD_DIR || 'storage/uploads',
    maxUploadBytes: Number(process.env.MAX_UPLOAD_BYTES || 5 * 1024 * 1024),
  };
};

module.exports = { loadEnv };
