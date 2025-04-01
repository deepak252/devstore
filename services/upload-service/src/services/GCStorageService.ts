import { bucket } from '../config/firebase'
import logger from '../utils/logger'

type FileUploadSuccess = {
  message: string
  key: string
  location: string
}

export class GCStorageService {
  static uploadFile = async (
    file: Express.Multer.File,
    dirPath?: string
  ): Promise<FileUploadSuccess | undefined> => {
    try {
      if (!file) throw new Error('File is required!')

      //   const fileStream = fs.createReadStream(file.path)
      const destination = dirPath
        ? `${dirPath}/${file.filename}`
        : `files/${file.filename}`

      await bucket.upload(file.path, {
        destination,
        public: true,
        gzip: true
      })

      return {
        message: 'File uploaded successfully',
        key: destination,
        location: `https://storage.googleapis.com/${bucket.name}/${destination}`
      }
    } catch (e) {
      logger.error('Error uploading file', e)
    }
  }

  static deleteFile = async (fileKey: string) => {
    try {
      await bucket.file(fileKey).delete()
      logger.info(`File deleted from GCStorage: ${fileKey}`)
    } catch (e) {
      logger.error('Error deleting file:', e)
    }
  }
}
