require('dotenv').config();
const { createApp, env } = require('./app');
const { connectDb } = require('./config/db');

const bootstrap = async () => {
  await connectDb(env.mongoUri);
  const app = createApp();
  app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

bootstrap().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
