import { getAmqpChannel } from '../config/rabbitmq'
import UserService from '../services/UserService'
import logger from '../utils/logger'

export const userProfileConsumer = async () => {
  const channel = getAmqpChannel()
  if (!channel) {
    return
  }
  const queue = 'user.queue'
  const exchange1 = 'upload.events'
  const bindingKey1 = 'user.image.uploaded'

  await channel.assertExchange(exchange1, 'topic', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange1, bindingKey1)

  await channel.prefetch(100)

  channel.consume(
    queue,
    async (msg) => {
      if (msg?.content) {
        try {
          const content = JSON.parse(msg.content.toString())
          logger.info(
            `Event recieved: ${msg?.fields?.routingKey}, ${msg?.content}`
          )

          if (msg.fields.routingKey === bindingKey1) {
            await UserService.updateUser(content?.remoteFile?.user, {
              profileImage: content?.remoteFile?._id
            })
          }

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
  logger.info(`Subscribed to event: ${bindingKey1}`)
}
