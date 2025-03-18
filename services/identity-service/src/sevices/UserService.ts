import mongoose from 'mongoose'
import { validateUpdateProfile } from '../api/utils/validation'
import { publishEvent } from '../events/producer'
import User from '../models/User'
import { IUser } from '../types/user.types'

export default class UserService {
  static getUser = async (userId: string) => {
    const _id = new mongoose.Types.ObjectId(userId)
    const result = await User.aggregate([
      {
        $match: {
          _id
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

    return user
  }
}
