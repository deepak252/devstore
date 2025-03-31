import { Schema } from 'mongoose'

export interface ILike {
  userId: Schema.Types.ObjectId
  projectId: Schema.Types.ObjectId
  blogId: Schema.Types.ObjectId
  createdAt: Date
  updatedAt: Date
}

export interface ILikeMethods {
  test: () => void
}
