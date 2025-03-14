import { channel } from '../config/rabbitmq'
import BannerService from '../services/BannerService'
import logger from '../utils/logger'

export const updateBannerConsumer = async () => {
  if (!channel) {
    return
  }
  const exchange = 'project.events'
  const queue = 'content.queue'
  const bindingKey = 'project.updated'

  await channel.assertExchange(exchange, 'topic', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange, bindingKey)

  channel.consume(queue, async (msg) => {
    try {
      if (msg?.content) {
        const content = JSON.parse(msg.content.toString())
        logger.info(`Event recieved: ${bindingKey}, ${msg?.content}`)

        await BannerService.createOrUpdateProjectBanner(content)

        channel?.ack(msg)
      }
    } catch (e: any) {
      logger.error(`Error processing event: ${bindingKey}, ${msg?.content}`, e)
    }
  })
  logger.info(`Subscribed to event: ${bindingKey}`)
}
