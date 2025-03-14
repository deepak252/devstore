import { S3Service } from '../../services/S3Service'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import RemoteFile from '../../models/RemoteFile'
import RemoteFileService from '../../services/RemoteFileService'
import { S3_APPLICATION_BUCKET, S3_MEDIA_BUCKET } from '../../config/env'
import { removeFile, removeFiles } from '../../utils/fileUtil'
import { publishEvent } from '../../events/producer'

export const uploadApplication = asyncHandler(async (req, _) => {
  try {
    if (!req.file) {
      throw new ApiError('No application file found')
    }

    const s3Service = new S3Service(S3_APPLICATION_BUCKET)

    const result = await s3Service.uploadToS3(req.file, req.user.userId)

    if (!result) {
      throw new ApiError('Unable to upload application file')
    }

    const remoteFile = new RemoteFile({
      publicId: result?.key,
      bucketName: S3_APPLICATION_BUCKET,
      originalName: req.file.originalname,
      user: req.user.userId,
      mimeType: req.file.mimetype,
      url: result?.location
    })

    await remoteFile.save()

    return new ResponseSuccess(
      'Application file uploaded successfully',
      remoteFile.toJSON(),
      201
    )
  } finally {
    if (req.file) {
      removeFile(req.file.path)
    }
  }
})

export const uploadProjectMedia = asyncHandler(async (req, res) => {
  const {
    attachmentIcon = [],
    attachmentImages = [],
    attachmentBanner = []
  }: any = req.files || {}
  const { projectId } = req.params
  const { userId } = req.user

  try {
    if (!projectId) {
      throw new ApiError('projectId is required')
    }

    res
      .status(201)
      .json(
        new ResponseSuccess('Processing project media files', undefined, 201)
      )

    const media: { icon?: any; images?: any; banner?: any } = {}

    if (attachmentIcon.length) {
      const uploadResult = await RemoteFileService.uploadMedia(
        attachmentIcon[0],
        userId,
        projectId
      )
      media.icon = uploadResult?.id
    }
    if (attachmentImages.length) {
      media.images = []
      for (const attchImg of attachmentImages) {
        const uploadResult = await RemoteFileService.uploadMedia(
          attchImg,
          userId,
          projectId
        )
        media.images.push(uploadResult?.id)
      }
    }
    if (attachmentBanner.length) {
      const uploadResult = await RemoteFileService.uploadMedia(
        attachmentBanner[0],
        userId,
        projectId
      )
      media.banner = uploadResult?.id
    }
    await publishEvent(
      'project.media.uploaded',
      JSON.stringify({
        projectId,
        userId,
        media
      })
    )
  } finally {
    removeFiles([
      ...attachmentIcon.map((e: Express.Multer.File) => e.path),
      ...attachmentImages.map((e: Express.Multer.File) => e.path),
      ...attachmentBanner.map((e: Express.Multer.File) => e.path)
    ])
  }
})

export const uploadMedia = asyncHandler(async (req, _) => {
  try {
    if (!req.file) {
      throw new ApiError('No media file found')
    }
    const s3Service = new S3Service(S3_MEDIA_BUCKET)

    const result = await s3Service.uploadToS3(req.file, req.user.userId)

    if (!result) {
      throw new ApiError('Unable to upload media')
    }

    const remoteFile = new RemoteFile({
      publicId: result?.key,
      bucketName: S3_MEDIA_BUCKET,
      originalName: req.file.originalname,
      user: req.user.userId,
      mimeType: req.file.mimetype,
      url: result?.location
    })

    await remoteFile.save()

    return new ResponseSuccess(
      'Media uploaded successfully',
      remoteFile.toJSON(),
      201
    )
  } finally {
    if (req.file) {
      removeFile(req.file.path)
    }
  }
})

export const getAllRemoteFiles = asyncHandler(async (req, _) => {
  const { page, limit } = req.query
  const result = await RemoteFileService.getAllFiles(
    Number(page) || 1,
    Number(limit) || 10
  )

  return new ResponseSuccess('Remote files fetched successfully', result)
})
