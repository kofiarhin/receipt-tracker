const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const receiptRoutes = require('./routes/receiptRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const { errorMiddleware } = require('./middleware/errorMiddleware');
const { makeUploadMiddleware } = require('./middleware/uploadMiddleware');
const { loadEnv } = require('./config/env');

const env = loadEnv();

const createApp = () => {
  const app = express();

  app.use(cors({ origin: env.clientUrl }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req, _res, next) => {
    req.upload = makeUploadMiddleware({
      uploadDir: path.resolve(env.uploadDir),
      maxUploadBytes: env.maxUploadBytes,
    });
    next();
  });

  app.get('/api/health', (_req, res) => res.json({ success: true, message: 'OK' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/expenses', expenseRoutes);
  app.use('/api/receipts', receiptRoutes);
  app.use('/api/dashboard', dashboardRoutes);

  app.use(errorMiddleware);

  return app;
};

module.exports = { createApp, env };
