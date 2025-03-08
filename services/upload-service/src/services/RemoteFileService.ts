import { S3_MEDIA_BUCKET } from '../config/env'
import { channel } from '../config/rabbitmq'
import RemoteFile from '../models/RemoteFile'
import logger from '../utils/logger'
import { S3Service } from './S3Service'

export default class RemoteFileService {
  static uploadMedia = async (
    file: Express.Multer.File,
    userId: string,
    parentId?: string
  ) => {
    const s3Service = new S3Service(S3_MEDIA_BUCKET)
    const uploadResult = await s3Service.uploadToS3(file)
    if (uploadResult) {
      const remoteFile = await RemoteFile.create({
        publicId: uploadResult?.key,
        bucketName: S3_MEDIA_BUCKET,
        parentId: parentId,
        originalName: file.originalname,
        user: userId,
        mimeType: file.mimetype,
        url: uploadResult?.location
      })
      return remoteFile
    }
  }

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

  static publishUpdateProjectMediaEvent = async ({
    projectId,
    userId,
    mediaIds
  }: {
    projectId: string
    userId: string
    mediaIds: string[]
  }) => {
    if (!mediaIds.length) {
      return
    }
    if (!channel) {
      return
    }
    const exchange = 'media.direct'
    const routingKey = 'media.delete'
    await channel.assertExchange(exchange, 'direct', { durable: false })

    channel.publish(
      exchange,
      routingKey,
      Buffer.from(
        JSON.stringify({
          projectId,
          userId,
          mediaIds
        })
      )
    )
    logger.info(`Event published: ${routingKey}, ${mediaIds}`)
  }
}
