import { channel } from '../config/rabbitmq'
import logger from '../utils/logger'

export const publishProjectMediaUploadEvent = async ({
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
  const exchange = 'upload.events'
  const routingKey = 'project.media.uploaded'
  await channel.assertExchange(exchange, 'topic', { durable: false })

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
