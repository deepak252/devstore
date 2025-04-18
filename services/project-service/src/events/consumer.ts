import { getAmqpChannel } from '../config/rabbitmq'
import ProjectService from '../services/ProjectService'
import logger from '../utils/logger'

export const updateProjectConsumer = async () => {
  const channel = getAmqpChannel()
  if (!channel) {
    return
  }
  const exchange = 'upload.events'
  const queue = 'project.queue'
  const bindingKey = 'project.media.uploaded'

  await channel.assertExchange(exchange, 'topic', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange, bindingKey)

  await channel.prefetch(100)

  channel.consume(
    queue,
    async (msg) => {
      if (msg?.content) {
        try {
          const content = JSON.parse(msg.content.toString())
          const { projectId, userId, media } = content
          logger.info(`Event recieved: ${bindingKey}, ${msg?.content}`)
          await ProjectService.updateProject(projectId, userId, media)
          channel?.ack(msg)
        } catch (e: any) {
          logger.error(
            `Error processing event: ${msg?.fields?.routingKey}, ${msg?.content}`,
            e
          )
          //TODO: Handle failure
          channel.nack(msg, false, false)
        }
      }
    },
    {
      noAck: false
    }
  )
  logger.info(`Subscribed to event: ${bindingKey}`)
}
