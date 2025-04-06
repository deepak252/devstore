import { getAmqpChannel } from '../config/rabbitmq'
import EmailService from '../services/EmailService'
import logger from '../utils/logger'

export const verifyEmailConsumer = async () => {
  const channel = getAmqpChannel()
  if (!channel) {
    return
  }
  const queue = 'notification.queue'
  const exchange1 = 'user.events'
  const bindingKey1 = 'user.verifyemail'

  await channel.assertExchange(exchange1, 'topic', { durable: false })
  await channel.assertQueue(queue, { durable: false })

  await channel.bindQueue(queue, exchange1, bindingKey1)

  await channel.prefetch(50)

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
            await EmailService.sendVerificationEmail(content)
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
