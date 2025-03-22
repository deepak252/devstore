import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  PORT = 3000,
  REDIS_URL = 'redis://localhost:6379',
  REDIS_HOST = 'localhost',
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',
  IDENTITY_SERVICE_URL = 'http://localhost:3001',
  PROJECT_SERVICE_URL = 'http://localhost:3002',
  UPLOAD_SERVICE_URL = 'http://localhost:3003',
  CONTENT_SERVICE_URL = 'http://localhost:3004',
  ACCESS_TOKEN_SECRET = 'STOREDEVACESSSECRETJWT12349876',
  KEEP_ALIVE_WORKER_URL = ''
} = process.env
