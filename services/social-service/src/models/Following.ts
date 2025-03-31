import { Schema, model, Model } from 'mongoose'
import { IFollowing, IFollowingMethods } from '../types/following.types'

interface FollowingModel extends Model<IFollowing, object, IFollowingMethods> {
  test: () => void
}

const followingSchema = new Schema<
  IFollowing,
  FollowingModel,
  IFollowingMethods
>(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true
    },
    followingId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      index: true
    }
  },
  {
    timestamps: true
  }
)

// Compound Index to prevent duplicate follows
followingSchema.index({ followerId: 1, followingId: 1 }, { unique: true })

const Following = model<IFollowing, FollowingModel>(
  'Following',
  followingSchema
)

export default Following
