import { getAmqpChannel } from '../config/rabbitmq'
import logger from '../utils/logger'

type RoutingKey = 'notification.sent'

export const publishEvent = async (routingKey: RoutingKey, data: string) => {
  const channel = getAmqpChannel()

  if (!data) {
    return
  }
  if (!channel) {
    return
  }
  const exchange = 'notification.events'
  await channel.assertExchange(exchange, 'topic', { durable: false })

  channel.publish(exchange, routingKey, Buffer.from(data))
  logger.info(`Event published: ${routingKey}, ${data}`)
}
