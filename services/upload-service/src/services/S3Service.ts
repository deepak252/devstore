import fs from 'fs'
import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { Upload } from '@aws-sdk/lib-storage'
import { s3Client } from '../config/s3Client'
import { SUPABASE_PROJECT_URL } from '../config/env'
import logger from '../utils/logger'

type S3UploadSuccess = {
  message: string
  key: string
  location: string
}

export class S3Service {
  readonly bucket
  constructor(bucket: string) {
    this.bucket = bucket || 'uploads'
  }
  uploadToS3 = async (
    file: Express.Multer.File,
    dirPath?: string
  ): Promise<S3UploadSuccess | undefined> => {
    try {
      if (!file) throw new Error('File is required!')

      const fileStream = fs.createReadStream(file.path)
      const fileKey = dirPath ? `${dirPath}/${file.filename}` : file.filename

      const uploader = new Upload({
        client: s3Client,
        params: {
          Bucket: this.bucket,
          Key: fileKey,
          Body: fileStream,
          ContentType: file.mimetype
        }
      })

      await uploader.done()

      return {
        message: 'File uploaded successfully',
        key: fileKey,
        location: `${SUPABASE_PROJECT_URL}/storage/v1/object/public/${this.bucket}/${fileKey}`
      }
    } catch (e) {
      logger.error('Error upload to S3', e)
    }
  }

  deleteFromS3 = async (fileKey: string) => {
    try {
      const result = await s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucket,
          Key: fileKey
        })
      )
      logger.info(`Media deleted from S3: ${fileKey}`)
      return result
    } catch (e) {
      logger.error('Error delete from S3', e)
    }
  }
}
