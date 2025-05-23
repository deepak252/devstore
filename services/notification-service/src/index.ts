import { createServer } from 'http'
import { PORT } from './config/env.js'
import { connectDB } from './config/db.js'
import app from './app.js'
import logger from './utils/logger.js'
import { connectRabbitMQ } from './config/rabbitmq.js'
import { verifyEmailConsumer } from './events/consumer.js'

connectDB()
  .then(async () => {
    const httpServer = createServer(app)

    await connectRabbitMQ()
    await verifyEmailConsumer()

    httpServer.listen(PORT, () => {
      logger.info(`🚀 Notification Service is running on PORT : ${PORT}`)
    })
  })
  .catch((err) => {
    logger.error('❌ ERROR Starting Server', err)
    process.exit(1)
  })

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`❌ Unhandled Rejection at ${promise}, reason: ${reason}`)
})
