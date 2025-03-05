import amqp from 'amqplib'
import { RABBITMQ_URL } from './env'
import logger from '../utils/logger'

let connection: amqp.ChannelModel | null = null
let channel: amqp.Channel | null = null
const MAX_RETRIES = 5
const RETRY_DELAY = 6000

const connectRabbitMQ = async () => {
  let attempt = 0

  while (attempt < MAX_RETRIES) {
    try {
      attempt++
      connection = await amqp.connect(RABBITMQ_URL)
      channel = await connection.createChannel()

      logger.info(`✅ Connected to RabbitMQ on attempt ${attempt}`)
      return { channel, connection }
    } catch (e: any) {
      logger.error(`❌ Error connecting to RabbitMQ (Attempt ${attempt}):`, e)

      if (attempt >= MAX_RETRIES) {
        logger.error(
          '❌ Maximum reconnection attempts reached. RabbitMQ connection failed.'
        )
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    }
  }
}

export { connectRabbitMQ, channel, connection }
