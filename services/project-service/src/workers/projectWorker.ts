import { channel } from '../config/rabbitmq'
import ProjectService from '../services/ProjectService'
import logger from '../utils/logger'

export const updateProjectWorker = async () => {
  if (!channel) {
    return
  }
  const exchange = 'project.direct'
  const queue = 'project.queue'
  const bindingKey = 'project.update'

  await channel.assertExchange(exchange, 'direct', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange, bindingKey)

  channel.consume(queue, async (msg) => {
    try {
      if (msg?.content) {
        const content = JSON.parse(msg.content.toString())
        const { projectId, userId, data } = content
        logger.info(`Event recieved: ${bindingKey}, ${msg?.content}`)
        await ProjectService.updateProject(projectId, userId, data)
        channel?.ack(msg)
      }
    } catch (e: any) {
      logger.error(`Error processing event: ${bindingKey}, ${msg?.content}`, e)
    }
  })
  logger.info(`Subscribed to event: ${bindingKey}`)
}
