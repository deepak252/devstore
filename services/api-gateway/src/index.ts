import { createServer } from 'http'
import { PORT } from './config/env.js'
import app from './app.js'
import logger from './utils/logger.js'

const httpServer = createServer(app)

httpServer.listen(PORT, () => {
  logger.info(`🚀 Devstore API Gateway is running on port : ${PORT}`)
})

process.on('unhandledRejection', (reason, promise) => {
  logger.error(`❌ Unhandled Rejection at ${promise}, reason: ${reason}`)
})
