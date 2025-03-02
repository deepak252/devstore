import { redisClient } from '../config/redis'
import { Platform } from '../constants/enums'
import Project from '../models/Project'
import { IProject } from '../types/project.types'

export default class ProjectService {
  static invalidateProjectCache = async (
    platform: Platform,
    postId?: string
  ) => {
    if (postId) {
      await redisClient.del(`${platform}:${postId}`)
    }
    const keys = await redisClient.keys(`${platform}s:*`)
    if (keys.length) {
      await redisClient.del(keys)
    }
  }

  static createProject = async (userId: string, values: Partial<IProject>) => {
    let post = new Project({
      ...values,
      owner: userId
    })
    post = await post.save()

    // await this.invalidateProjectCache()

    return post
  }

  static getProject = async (projectId: string) => {
    // const cacheKey = `project:${projectId}`
    // const cachedProject = await redisClient.get(cacheKey)
    // if (cachedProject) {
    //   return JSON.parse(cachedProject)
    // }
    const project = await Project.findById(projectId)
    if (project) {
      // await redisClient.setex(cacheKey, 3600, JSON.stringify(post))
      return project
    }
  }

  static getProjects = async (
    platform: Platform,
    page: number,
    limit: number
  ) => {
    const startIndex = (page - 1) * limit
    // const cacheKey = `posts:${page}:${limit}`
    // const cachedPosts = await redisClient.get(cacheKey)
    // if (cachedPosts) {
    //   return JSON.parse(cachedPosts)
    // }
    const projects = await Project.find({ platform })
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
    const totalItems = await Project.countDocuments()

    const pagination = {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      itemsPerPage: limit
    }

    const result = {
      projects,
      pagination
    }

    // await redisClient.setex(cacheKey, 300, JSON.stringify(result)) // delete record after 5 mins

    return result
  }

  static deleteProject = async (projectId: string, userId: string) => {
    const project = await Project.findOneAndDelete({
      _id: projectId,
      owner: userId
    })
    // if (project) {
    //   if (post.mediaIds.length) {
    //     await this.publishDeleteMediaEvent({
    //       postId,
    //       userId,
    //       mediaIds: post.mediaIds
    //     })
    //   }
    //   await this.invalidatePostCache(postId)
    // }
    return project
  }

  // static publishDeleteMediaEvent = async ({
  //   postId,
  //   userId,
  //   mediaIds
  // }: {
  //   postId: string
  //   userId: string
  //   mediaIds: string[]
  // }) => {
  //   if (!mediaIds.length) {
  //     return
  //   }
  //   if (!channel) {
  //     return
  //   }
  //   const exchange = 'media.direct'
  //   const routingKey = 'media.delete'
  //   await channel.assertExchange(exchange, 'direct', { durable: false })

  //   channel.publish(
  //     exchange,
  //     routingKey,
  //     Buffer.from(
  //       JSON.stringify({
  //         postId,
  //         userId,
  //         mediaIds
  //       })
  //     )
  //   )
  //   logger.info(`Event published: ${routingKey}, ${mediaIds}`)
  // }
}
