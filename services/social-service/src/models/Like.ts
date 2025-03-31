import { Schema, model, Model } from 'mongoose'
import { ILike, ILikeMethods } from '../types/like.types'

interface LikeModel extends Model<ILike, object, ILikeMethods> {
  test: () => void
}

const likeSchema = new Schema<ILike, LikeModel, ILikeMethods>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      index: true
    },
    blogId: {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
      index: true
    }
  },
  {
    timestamps: true
  }
)

// Compound Indexes for frequent query patterns
likeSchema.index({ userId: 1, projectId: 1 }, { unique: true, sparse: true })
likeSchema.index({ userId: 1, blogId: 1 }, { unique: true, sparse: true })

const Like = model<ILike, LikeModel>('Like', likeSchema)

export default Like
