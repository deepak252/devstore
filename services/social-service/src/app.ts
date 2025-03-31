import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import router from './api/routes/index.js'
// import { rateLimiter, sensitiveRateLimiter } from './middlewares/rateLimiter.js'
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

// app.use((req, res, next) => {
//   rateLimiter
//     .consume(String(req.ip))
//     .then(() => next())
//     .catch(() => {
//       logger.warn(`Rate limit exceeded for IP: ${req.ip}`)
//       res.status(429).send(new ResponseFailure('Too many requests'))
//     })
// })
// app.use('/api/auth/register', sensitiveRateLimiter)

app.use('/api', router)

app.get('/health', (_, res) => {
  res.status(200).json({
    code: 200,
    message: 'Content Service OK',
    data: {
      mongo: checkMongoStatus(),
      redis: checkRedisStatus(),
      rabbitmq: checkAmqpStatus()
    }
  })
})

app.use(errorHandler)

export default app
