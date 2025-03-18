import { createServer } from 'http'
import { SERVER_PORT } from './config/env.js'
import { connectDB } from './config/db.js'
import app from './app.js'
import logger from './utils/logger.js'
import { connectRabbitMQ } from './config/rabbitmq.js'
import { userProfileConsumer } from './events/consumer.js'

connectDB()
  .then(async () => {
    const httpServer = createServer(app)

    await connectRabbitMQ()
    await userProfileConsumer()

    httpServer.listen(SERVER_PORT, () => {
      logger.info(`Identity Service is running on port : ${SERVER_PORT}`)
    })
  })
  .catch((err) => {
    logger.error(`ERROR Starting Identity Service - ${err}`)
    process.exit(1)
  })

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`Unhandled Rejection at ${promise}, reason: ${reason}`)
})
