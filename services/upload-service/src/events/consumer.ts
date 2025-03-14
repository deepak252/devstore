import { channel } from '../config/rabbitmq'
import RemoteFileService from '../services/RemoteFileService'
import logger from '../utils/logger'

export const deleteRemoteFileConsumer = async () => {
  if (!channel) {
    return
  }

  const queue = 'upload.queue'
  const exchange1 = 'user.events'
  const exchange2 = 'project.events'
  const bindingKey1 = 'user.image.deleted'
  const bindingKey2 = 'project.deleted'
  const bindingKey3 = 'project.media.deleted'

  await channel.assertExchange(exchange1, 'topic', { durable: false })
  await channel.assertExchange(exchange2, 'topic', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange1, bindingKey1)
  await channel.bindQueue(queue, exchange2, bindingKey2)
  await channel.bindQueue(queue, exchange2, bindingKey3)

  channel.consume(queue, async (msg) => {
    if (msg?.content) {
      const content = JSON.parse(msg.content.toString())
      logger.info(`Event recieved: ${msg.fields.routingKey}, ${msg?.content}`)
      if (msg.fields.routingKey === bindingKey2) {
        await RemoteFileService.deleteMultipleFiles([
          content.project?.icon,
          content.project?.banner,
          ...(content.project?.images ?? [])
        ])
      }
      channel?.ack(msg)
    }
  })

  logger.info(`Subscribed to event: ${bindingKey1}`)
  logger.info(`Subscribed to event: ${bindingKey2}`)
  logger.info(`Subscribed to event: ${bindingKey3}`)
}
