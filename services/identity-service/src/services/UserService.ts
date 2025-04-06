import mongoose from 'mongoose'
import { validateUpdateProfile } from '../api/utils/validation'
import { publishEvent } from '../events/producer'
import User from '../models/User'
import { IUser } from '../types/user.types'
import { redisClient } from '../config/redis'

export default class UserService {
  static invalidateUserCache = async (userId?: string) => {
    if (userId) {
      await redisClient.del(`user:${userId}`)
    }
    const keys = await redisClient.keys(`users:*`)
    if (keys.length) {
      await redisClient.del(keys)
    }
  }

  static getUser = async ({
    userId,
    username
  }: {
    userId?: string
    username?: string
  }) => {
    const _id = new mongoose.Types.ObjectId(userId)
    let filter = {}
    if (userId) {
      filter = { _id }
    } else if (username) {
      filter = { username }
    } else {
      throw new Error('Invalid parameters')
    }
    const result = await User.aggregate([
      {
        $match: filter
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'profileImage',
          foreignField: '_id',
          as: 'profileImage'
        }
      },
      { $unwind: { path: '$profileImage', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          username: 1,
          email: 1,
          fullname: 1,
          title: 1,
          headline: 1,
          about: 1,
          profileImage: {
            _id: 1,
            url: 1,
            mimeType: 1
          }
        }
      }
    ])
    return result?.[0]
  }

  static updateUser = async (userId: string, data: Partial<IUser>) => {
    const { error } = validateUpdateProfile(data)
    if (error) {
      throw new Error(error.details[0].message)
    }
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const prevProfileImage = user.profileImage
    const { fullname, title, headline, about, profileImage } = data

    if (fullname !== undefined) user.fullname = fullname
    if (title !== undefined) user.title = title
    if (headline !== undefined) user.headline = headline
    if (about !== undefined) user.about = about
    if (profileImage !== undefined) user.profileImage = profileImage

    await user.save()
    if (prevProfileImage && profileImage) {
      publishEvent(
        'user.image.deleted',
        JSON.stringify({
          user: {
            profileImage: prevProfileImage
          }
        })
      )
    }
    await UserService.invalidateUserCache(userId)
    return await this.getUser({ userId })
  }

  static getUsers = async (page: number, limit: number) => {
    const skip = (page - 1) * limit
    let cacheKey = ''
    if (page === 1 && limit === 10) {
      cacheKey = `users:${page}:${limit}`
    }
    // if (cacheKey) {
    //   const cachedData = await redisClient.get(cacheKey)
    //   if (cachedData) {
    //     return JSON.parse(cachedData)
    //   }
    // }

    const result = await User.aggregate([
      {
        $match: {
          isEmailVerified: true
        }
      },
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'profileImage',
          foreignField: '_id',
          as: 'profileImage'
        }
      },
      { $unwind: { path: '$profileImage', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'projects', // Join with projects collection
          localField: '_id',
          foreignField: 'owner',
          as: 'allProjects'
        }
      },
      {
        $addFields: {
          projects: { $slice: ['$allProjects', -3] } // Get the last 3 projects
        }
      },
      {
        $project: {
          allProjects: 0 // Exclude the full allProjects array, keep only projects
        }
      },
      {
        $facet: {
          metadata: [{ $count: 'totalItems' }],
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                username: 1,
                email: 1,
                fullname: 1,
                title: 1,
                headline: 1,
                about: 1,
                profileImage: {
                  _id: 1,
                  url: 1,
                  mimeType: 1
                },
                projects: {
                  _id: 1,
                  name: 1,
                  type: 1,
                  platforms: 1
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
      users: result[0]?.data,
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
}
