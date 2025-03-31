import amqp from 'amqplib'
import { RABBITMQ_URL } from './env'
import logger from '../utils/logger'

let connection: amqp.ChannelModel | null = null
let channel: amqp.Channel | null = null
const MAX_RETRIES = 5
const RETRY_DELAY = 6000

export const connectRabbitMQ = async () => {
  let attempt = 0

  while (attempt < MAX_RETRIES) {
    try {
      attempt++
      connection = await amqp.connect(RABBITMQ_URL)
      connection.on('error', (err) => {
        logger.error('❌ RabbitMQ connection error:', err)
        connection = null
      })

      connection.on('close', () => {
        logger.error('❌ RabbitMQ connection closed.')
        connection = null
      })

      channel = await connection.createChannel()

      logger.info(`✅ Connected to RabbitMQ on attempt ${attempt}`)
      return { channel, connection }
    } catch (e: any) {
      logger.error(`❌ Error connecting to RabbitMQ (Attempt ${attempt}):`, e)

      if (attempt >= MAX_RETRIES) {
        logger.error(
          '❌ Maximum reconnection attempts reached. RabbitMQ connection failed.'
        )
        return
      }

      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY))
    }
  }
}

export const getAmqpConnection = () => connection

export const getAmqpChannel = () => channel

export const checkAmqpStatus = (): string => {
  const conn = getAmqpConnection()
  return conn ? 'connected' : 'disconnected'
}
