import RemoteFile from '../models/RemoteFile'
import logger from '../utils/logger'
import { S3Service } from './S3Service'

export default class RemoteFileService {
  static getAllFiles = async (page: number, limit: number) => {
    const startIndex = (page - 1) * limit
    const medias = await RemoteFile.find({})
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit)
    const totalItems = await RemoteFile.countDocuments()

    const pagination = {
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      currentPage: page,
      itemsPerPage: limit
    }

    const result = {
      medias,
      pagination
    }

    return result
  }

  static deleteSingleFile = async (mediaId: string) => {
    const s3Service = new S3Service('uploads')

    const media = await RemoteFile.findOneAndDelete({
      _id: mediaId
    })
    if (media) {
      await s3Service.deleteFromS3(media.publicId)
      logger.info(`Remote file deleted successfully: ${mediaId}`)
    }
    return media
  }

  static deleteMultipleFiles = async (mediaIds: string[]) => {
    for (const mediaId of mediaIds) {
      await this.deleteSingleFile(mediaId)
    }
    return true
  }
}
