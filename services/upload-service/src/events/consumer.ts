import { channel } from '../config/rabbitmq'
import RemoteFileService from '../services/RemoteFileService'
import logger from '../utils/logger'

export const deleteRemoteFileConsumer = async () => {
  if (!channel) {
    return
  }
  // exchange: upload.events
  // routing : project.media.uploaded
  // queue   : project.queue
  const exchange = 'remotefile'
  const bindingKey = 'remotefile.delete'
  const queue = 'remotefile.queue'

  await channel.assertExchange(exchange, 'topic', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange, bindingKey)

  channel.consume(queue, (msg) => {
    if (msg?.content) {
      const content = JSON.parse(msg.content.toString())
      if (content.postId) {
        RemoteFileService.deleteMultipleFiles(content.fileIds)
      }
      logger.info(`Event recieved: ${bindingKey}, ${content}`)
      channel?.ack(msg)
    }
  })

  logger.info(`Subscribed to event: ${bindingKey}`)
}
