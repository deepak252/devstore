import { channel } from '../config/rabbitmq'
import logger from '../utils/logger'

type RoutingKey = 'project.deleted'

export const publishEvent = async (routingKey: RoutingKey, data: string) => {
  if (!data) {
    return
  }
  if (!channel) {
    return
  }
  const exchange = 'project.events'
  await channel.assertExchange(exchange, 'topic', { durable: false })

  channel.publish(exchange, routingKey, Buffer.from(data))
  logger.info(`Event published: ${routingKey}, ${data}`)
}

// export const publishProjectDeletedEvent = async ({
//   project
// }: {
//   project: IProject
// }) => {
//   if (!project) {
//     return
//   }
//   if (!channel) {
//     return
//   }
//   const exchange = 'project.events'
//   const routingKey = 'project.deleted'
//   await channel.assertExchange(exchange, 'topic', { durable: false })

//   channel.publish(
//     exchange,
//     routingKey,
//     Buffer.from(
//       JSON.stringify({
//         project
//       })
//     )
//   )
//   logger.info(`Event published: ${routingKey}, ${project}`)
// }
