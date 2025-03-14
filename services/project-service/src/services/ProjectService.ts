import { validateCreateProject } from '../api/utils/validation'
import { redisClient } from '../config/redis'
import { Platform } from '../constants/enums'
import { publishEvent } from '../events/producer'
import Project from '../models/Project'
import { IProject } from '../types/project.types'

export default class ProjectService {
  static invalidateProjectCache = async (
    platform: Platform,
    projectId?: string
  ) => {
    if (projectId) {
      await redisClient.del(`${platform}:${projectId}`)
    }
    const keys = await redisClient.keys(`${platform}s:*`)
    if (keys.length) {
      await redisClient.del(keys)
    }
  }

  static createProject = async (userId: string, values: Partial<IProject>) => {
    const project = await Project.create({
      ...values,
      owner: userId
    })
    // await this.invalidateProjectCache()

    return project
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

  static getUserProject = async (projectId: string, userId: string) => {
    try {
      return await Project.findOne({ owner: userId, _id: projectId })
    } catch {
      return false
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

  static updateProject = async (
    projectId: string,
    userId: string,
    values: Partial<IProject>
  ) => {
    const project = await Project.findOne({ _id: projectId, owner: userId })
    if (!project) {
      throw new Error('Project not found')
    }
    Object.assign(project, values)
    const { error } = validateCreateProject(project)
    if (error) {
      project.active = false
    } else {
      project.active = true
      publishEvent('project.updated', JSON.stringify(project.toJSON()))
    }

    await project?.save()

    return project
  }
}
