import { redisClient } from '../config/redis'
import { Platform } from '../constants/enums'
import Category from '../models/Category'

export default class MetadataService {
  static invalidateMetadataCache = async (platform: Platform) => {
    const keys = await redisClient.keys(`${projectType}s:*`)
    if (keys.length) {
      await redisClient.del(keys)
    }
  }

  static createCategory = async (name: string, platform: Platform) => {
    let category = new Category({
      name,
      platform
    })
    category = await category.save()

    await this.invalidateMetadataCache(platform)

    return category
  }

  static getAllCategories = async (projectId: string) => {
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
    projectType: ProjectType,
    page: number,
    limit: number
  ) => {
    const startIndex = (page - 1) * limit
    // const cacheKey = `posts:${page}:${limit}`
    // const cachedPosts = await redisClient.get(cacheKey)
    // if (cachedPosts) {
    //   return JSON.parse(cachedPosts)
    // }
    const projects = await Project.find({ type: projectType })
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
}
