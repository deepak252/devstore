import { S3Service } from '../../services/S3Service'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import RemoteFile from '../../models/RemoteFile'
import RemoteFileService from '../../services/RemoteFileService'
import { S3_APPLICATION_BUCKET, S3_MEDIA_BUCKET } from '../../config/env'
import { removeFile } from '../../utils/fileUtil'

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
