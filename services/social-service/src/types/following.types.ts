import { Schema } from 'mongoose'

export interface IFollowing {
  followerId: Schema.Types.ObjectId
  followingId: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface IFollowingMethods {
  test: () => void
}
