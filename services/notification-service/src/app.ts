import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { errorHandler } from './api/middlewares/errorHandler.js'
import logger from './utils/logger.js'
import { checkMongoStatus } from './config/db.js'
import { checkRedisStatus } from './config/redis.js'
import { checkAmqpStatus } from './config/rabbitmq.js'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(
  cors({
    origin: '*'
    // credentials: true
  })
)
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`)
  next()
})

app.get('/health', (_, res) => {
  res.status(200).json({
    code: 200,
    message: 'Notification Service OK',
    data: {
      mongo: checkMongoStatus(),
      redis: checkRedisStatus(),
      rabbitmq: checkAmqpStatus()
    }
  })
})

app.use(errorHandler)

export default app
