import { getAmqpChannel } from '../config/rabbitmq'
import BannerService from '../services/LikeService'
import logger from '../utils/logger'

export const bannerConsumer = async () => {
  const channel = getAmqpChannel()
  if (!channel) {
    return
  }
  const queue = 'content.queue'
  const exchange1 = 'project.events'
  const bindingKey1 = 'project.updated'
  const bindingKey2 = 'project.deleted'

  await channel.assertExchange(exchange1, 'topic', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange1, bindingKey1)
  await channel.bindQueue(queue, exchange1, bindingKey2)

  channel.consume(queue, async (msg) => {
    try {
      if (msg?.content) {
        const content = JSON.parse(msg.content.toString())
        logger.info(
          `Event recieved: ${msg?.fields?.routingKey}, ${msg?.content}`
        )

        if (msg.fields.routingKey === bindingKey1) {
          await BannerService.createOrUpdateProjectBanner(content?.project)
        } else if (msg.fields.routingKey === bindingKey2) {
          await BannerService.deleteBanner(content?.project?._id)
        }

        channel?.ack(msg)
      }
    } catch (e: any) {
      logger.error(
        `Error processing event: ${msg?.fields?.routingKey}, ${msg?.content}`,
        e
      )
    }
  })
  logger.info(`Subscribed to event: ${bindingKey1}`)
  logger.info(`Subscribed to event: ${bindingKey2}`)
}
