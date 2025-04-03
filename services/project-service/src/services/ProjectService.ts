import mongoose from 'mongoose'
import { validateProject } from '../api/utils/validation'
import { redisClient } from '../config/redis'
import { Platform, ProjectType } from '../constants/enums'
import { publishEvent } from '../events/producer'
import Project from '../models/Project'
import { IProject } from '../types/project.types'
import { getProjectType } from '../utils/projectUtil'

export default class ProjectService {
  static invalidateProjectCache = async (
    projectType: ProjectType,
    projectId?: string
  ) => {
    if (projectId) {
      await redisClient.del(`${projectType}:${projectId}`)
    }
    const [keys1, keys2, keys3] = await Promise.all([
      redisClient.keys(`alls:*`),
      redisClient.keys(`apps:*`),
      redisClient.keys(`webs:*`)
    ])

    const keys = [...keys1, ...keys2, ...keys3]

    if (keys.length) {
      await redisClient.del(keys)
    }
  }

  static createProject = async (userId: string, values: Partial<IProject>) => {
    const project = await Project.create({
      ...values,
      owner: userId
    })

    await Project.updateMany(
      {
        _id: { $ne: project._id },
        owner: userId,
        position: {
          $gte: 0
        }
      },
      { $inc: { position: 1 } }
    )

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
          from: 'remotefiles',
          localField: 'icon',
          foreignField: '_id',
          as: 'icon'
        }
      },
      {
        $unwind: {
          path: '$icon',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'banner',
          foreignField: '_id',
          as: 'banner'
        }
      },
      {
        $unwind: {
          path: '$banner',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'images',
          foreignField: '_id',
          as: 'images'
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
      {
        $unwind: {
          path: '$owner',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'owner.profileImage',
          foreignField: '_id',
          as: 'owner.profileImage'
        }
      },
      {
        $unwind: {
          path: '$owner.profileImage',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          name: 1,
          categories: 1,
          position: 1,
          platforms: 1,
          description: 1,
          demoUrl: 1,
          sourceCodeUrl: 1,
          isPrivate: 1,
          owner: {
            _id: 1,
            username: 1,
            fullname: 1,
            profileImage: {
              _id: 1,
              url: 1,
              mimeType: 1
            }
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
    projectType: ProjectType,
    page: number,
    limit: number,
    ownerId?: string
  ) => {
    const skip = (page - 1) * limit
    let cacheKey = ''
    if (page === 1 && limit === 10 && !ownerId) {
      cacheKey = `${projectType}s:${page}:${limit}`
    }
    if (cacheKey) {
      const cachedData = await redisClient.get(cacheKey)
      if (cachedData) {
        return JSON.parse(cachedData)
      }
    }

    let platforms: Platform[] = []
    if ([ProjectType.all, ProjectType.app].includes(projectType)) {
      platforms = [Platform.android, Platform.ios]
    }
    if ([ProjectType.all, ProjectType.web].includes(projectType)) {
      platforms.push(Platform.website)
    }

    let filter2 = {}
    if (ownerId) {
      const owner = new mongoose.Types.ObjectId(ownerId)
      filter2 = { owner }
    }

    const result = await Project.aggregate([
      {
        $match: {
          platforms: { $in: platforms },
          ...filter2
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
      {
        $unwind: {
          path: '$icon',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'banner',
          foreignField: '_id',
          as: 'banner'
        }
      },
      {
        $unwind: {
          path: '$banner',
          preserveNullAndEmptyArrays: true
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
      {
        $unwind: {
          path: '$owner',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'owner.profileImage',
          foreignField: '_id',
          as: 'owner.profileImage'
        }
      },
      {
        $unwind: {
          path: '$owner.profileImage',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $facet: {
          metadata: [{ $count: 'totalItems' }],
          data: [
            // { $sort: { createdAt: -1 } },
            { $sort: { position: 1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                name: 1,
                description: ownerId ? 1 : undefined,
                position: 1,
                categories: 1,
                type: 1,
                platforms: 1,
                owner: {
                  _id: 1,
                  username: 1,
                  fullname: 1,
                  profileImage: {
                    _id: 1,
                    url: 1,
                    mimeType: 1
                  }
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
    const data = {
      projects: result[0]?.data,
      metadata: {
        currentPage: page,
        itemsPerPage: limit,
        totalItems,
        totalPages: Math.ceil(totalItems / limit)
      }
    }

    if (cacheKey) {
      await redisClient.setex(cacheKey, 3600, JSON.stringify(data)) // delete record after 1hr
    }
    return data
  }

  static deleteProject = async (projectId: string, userId: string) => {
    const project = await Project.findOneAndDelete({
      _id: projectId,
      owner: userId
    })
    await Project.updateMany(
      {
        owner: userId,
        position: {
          $gte: project?.position
        }
      },
      { $inc: { position: -1 } }
    )

    await publishEvent(
      'project.deleted',
      JSON.stringify({
        project
      })
    )
    await this.invalidateProjectCache(
      getProjectType(project?.platforms ?? []),
      projectId
    )
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
    delete values.position

    Object.assign(project, values)
    const { error } = validateProject(project)
    if (error) {
      project.active = false
    } else {
      project.active = true
      publishEvent('project.updated', JSON.stringify({ project }))
    }

    await project?.save()

    await this.invalidateProjectCache(
      getProjectType(project?.platforms ?? []),
      projectId
    )

    return project
  }

  // static updateUser = async (userId: string, data: Partial<IUser>) => {
  //   const { error } = validateUpdateProfile(data)
  //   if (error) {
  //     throw new Error(error.details[0].message)
  //   }
  //   const user = await User.findById(userId)
  //   if (!user) {
  //     throw new Error('User not found')
  //   }

  //   const prevProfileImage = user.profileImage
  //   const { fullname, title, headline, about, profileImage } = data

  //   if (fullname !== undefined) user.fullname = fullname
  //   if (title !== undefined) user.title = title
  //   if (headline !== undefined) user.headline = headline
  //   if (about !== undefined) user.about = about
  //   if (profileImage !== undefined) user.profileImage = profileImage

  //   await user.save()
  //   if (prevProfileImage && profileImage) {
  //     publishEvent(
  //       'user.image.deleted',
  //       JSON.stringify({
  //         user: {
  //           profileImage: prevProfileImage
  //         }
  //       })
  //     )
  //   }
  //   await UserService.invalidateUserCache(userId)
  //   return await this.getUser({ userId })
  // }

  static orderProjects = async (
    userId: string,
    projectId: string,
    newIndex: number
  ) => {
    const project = await Project.findOne({ _id: projectId, owner: userId })
    if (!project) {
      throw new Error('Project not found')
    }
    const currIndex = project.position
    if (newIndex === currIndex) {
      return
    }
    project.position = newIndex
    if (newIndex > currIndex) {
      await Project.updateMany(
        {
          owner: userId,
          position: {
            $gt: currIndex,
            $lte: newIndex
          }
        },
        { $inc: { position: -1 } }
      )
    } else {
      await Project.updateMany(
        {
          owner: userId,
          position: {
            $gte: newIndex,
            $lt: currIndex
          }
        },
        { $inc: { position: 1 } }
      )
    }
    await project.save()
    return project
  }
}
