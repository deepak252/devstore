import { channel } from '../config/rabbitmq'
import logger from '../utils/logger'

export default class UploadService {
  static publishUpdateProjectMediaEvent = async ({
    projectId,
    userId,
    data
  }: {
    projectId: string
    userId: string
    data: any
  }) => {
    if (!data) {
      return
    }
    if (!channel) {
      return
    }
    const exchange = 'project.direct'
    const routingKey = 'project.update'
    await channel.assertExchange(exchange, 'direct', { durable: false })

    channel.publish(
      exchange,
      routingKey,
      Buffer.from(
        JSON.stringify({
          projectId,
          userId,
          data
        })
      )
    )
    logger.info(`Event published: ${routingKey}, ${data}`)
  }
}
