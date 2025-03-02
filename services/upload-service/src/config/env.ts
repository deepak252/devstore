import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  SERVER_PORT = 3003,
  REDIS_URL = 'redis://localhost:6379',
  REDIS_HOST = 'localhost',
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',
  MONGO_URI = '',
  RABBITMQ_URL = 'amqp://localhost',
  ACCESS_TOKEN_SECRET = 'STOREDEVACESSSECRETJWT12349876',
  S3_URL = '',
  S3_REGION = '',
  AWS_ACCESS_KEY = '',
  AWS_SECRET_KEY = '',
  S3_APPLICATION_BUCKET = 'application',
  S3_MEDIA_BUCKET = 'media',
  SUPABASE_PROJECT_URL
} = process.env
