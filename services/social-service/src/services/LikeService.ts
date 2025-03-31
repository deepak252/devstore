import Like from '../models/Like'

export default class LikeService {
  static createLike = async ({
    userId,
    projectId,
    blogId
  }: {
    userId: string
    projectId?: string
    blogId?: string
  }) => {
    const like = await Like.create({
      userId,
      projectId,
      blogId
    })
    return like
  }

  static deleteLike = async ({
    userId,
    projectId,
    blogId
  }: {
    userId: string
    projectId?: string
    blogId?: string
  }) => {
    if (!projectId) {
      return
    }
    const deletedLike = await Like.findOneAndDelete({
      userId,
      projectId,
      blogId
    })
    return deletedLike
  }
}
