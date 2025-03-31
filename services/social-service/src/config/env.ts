import dotenv from 'dotenv'
dotenv.config()

export const {
  NODE_ENV = 'development',
  PORT = 3005,
  REDIS_URL = 'redis://localhost:6379',
  REDIS_HOST = 'localhost',
  REDIS_PORT = '6379',
  REDIS_PASSWORD = '',
  MONGO_URI = '',
  RABBITMQ_URL = 'amqp://localhost',
  ACCESS_TOKEN_SECRET = 'STOREDEVACESSSECRETJWT12349876'
} = process.env
