import { channel } from '../config/rabbitmq'
import logger from '../utils/logger'

type RoutingKey = 'project.media.uploaded'

export const publishEvent = async (routingKey: RoutingKey, data: string) => {
  if (!data) {
    return
  }
  if (!channel) {
    return
  }
  const exchange = 'upload.events'
  await channel.assertExchange(exchange, 'topic', { durable: false })

  channel.publish(exchange, routingKey, Buffer.from(data))
  logger.info(`Event published: ${routingKey}, ${data}`)
}
