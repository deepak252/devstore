import { getAmqpChannel } from '../config/rabbitmq'
import logger from '../utils/logger'

type RoutingKey = 'content.banner.deleted' | 'content.category.deleted'

export const publishEvent = async (routingKey: RoutingKey, data: string) => {
  const channel = getAmqpChannel()

  if (!data) {
    return
  }
  if (!channel) {
    return
  }
  const exchange = 'content.events'
  await channel.assertExchange(exchange, 'topic', { durable: false })

  channel.publish(exchange, routingKey, Buffer.from(data))
  logger.info(`Event published: ${routingKey}, ${data}`)
}
