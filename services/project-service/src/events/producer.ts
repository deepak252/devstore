import { getAmqpChannel } from '../config/rabbitmq'
import logger from '../utils/logger'

type RoutingKey = 'project.deleted' | 'project.updated'

export const publishEvent = async (routingKey: RoutingKey, data: string) => {
  if (!data) {
    return
  }
  const channel = getAmqpChannel()
  if (!channel) {
    return
  }
  const exchange = 'project.events'
  await channel.assertExchange(exchange, 'topic', { durable: false })

  channel.publish(exchange, routingKey, Buffer.from(data))
  logger.info(`Event published: ${routingKey}, ${data}`)
}
