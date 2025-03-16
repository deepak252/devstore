import mongoose from 'mongoose'
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

  static getProjectDetails = async (projectId: string) => {
    const _id = new mongoose.Types.ObjectId(projectId)
    const project = await Project.aggregate([
      {
        $match: {
          _id
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner'
        }
      },
      { $unwind: '$owner' },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'icon',
          foreignField: '_id',
          as: 'icon'
        }
      },
      { $unwind: '$icon' },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'banner',
          foreignField: '_id',
          as: 'banner'
        }
      },
      { $unwind: '$banner' },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
        }
      },
      {
        $project: {
          name: 1,
          categories: 1,
          platform: 1,
          description: 1,
          demoUrl: 1,
          sourceCodeUrl: 1,
          owner: {
            _id: 1,
            username: 1,
            fullname: 1
          },
          icon: {
            _id: 1,
            url: 1,
            mimeType: 1
          },
          banner: {
            _id: 1,
            url: 1,
            mimeType: 1
          },
          images: {
            _id: 1,
            url: 1,
            mimeType: 1
          },
          createdAt: 1,
          updatedAt: 1
        }
      }
    ])
    return project?.[0]
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
    const skip = (page - 1) * limit
    // const cacheKey = `posts:${page}:${limit}`
    // const cachedPosts = await redisClient.get(cacheKey)
    // if (cachedPosts) {
    //   return JSON.parse(cachedPosts)
    // }

    const result = await Project.aggregate([
      {
        $match: {
          platform
        }
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'icon',
          foreignField: '_id',
          as: 'icon'
        }
      },
      { $unwind: '$icon' },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner'
        }
      },
      { $unwind: '$owner' },
      {
        $facet: {
          metadata: [{ $count: 'totalItems' }],
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                name: 1,
                categories: 1,
                platform: 1,
                owner: {
                  _id: 1,
                  username: 1,
                  fullname: 1
                },
                icon: {
                  _id: 1,
                  url: 1,
                  mimeType: 1
                }
              }
            }
          ]
        }
      },
      { $unwind: { path: '$metadata', preserveNullAndEmptyArrays: true } }
    ])

    // await redisClient.setex(cacheKey, 300, JSON.stringify(result)) // delete record after 5 mins
    const totalItems = result[0]?.metadata?.totalItems || 0
    return {
      projects: result[0]?.data,
      metadata: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit)
      }
    }
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
      publishEvent('project.updated', JSON.stringify({ project }))
    }

    await project?.save()

    return project
  }
}
