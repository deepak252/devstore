import { Request, Response, NextFunction } from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { removeFile } from '../../utils/fileUtil'
import { ApiError } from '../utils/ApiError'
import logger from '../../utils/logger'

const destPath = 'uploads'

const getFileName = (file: Express.Multer.File) => {
  return `${file.mimetype.split('/')[0]}_${uuidv4()}_${new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, '_')
    .substring(0, 23)}${path.extname(file.originalname)}`
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dirPath = `${destPath}/${req.user.userId ?? ''}`
    // Create the 'uploads/**' folder if it doesn't exist
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    // Store files in the 'uploads/' directory
    cb(null, dirPath)
  },
  filename: function (req, file, cb) {
    const filename = getFileName(file)
    cb(null, filename)
    //Ref: https://github.com/expressjs/multer/issues/259#issuecomment-691748926
    req.on('aborted', () => {
      logger.info('Upload file aborted')
      file.stream.on('end', () => {
        removeFile(path.join(destPath, filename))
      })
      file.stream.emit('end')
    })
  }
})

interface CustomField {
  name: string
  maxCount?: number
  maxSizeKB?: number
  allowedExtensions?: string[] // eg. [".png", ".jpg", ".jpeg", ".gif", ".pdf"]
}

const uploadMiddleware = (fields: CustomField[]) => {
  const maxSizeKB = Math.max(...fields.map((field) => field.maxSizeKB || 128))

  const multr = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
      for (const field of fields) {
        if (field.name === file.fieldname) {
          const ext = path.extname(file.originalname).toLowerCase()
          if (
            field.allowedExtensions?.length &&
            !field.allowedExtensions.includes(ext)
          ) {
            return cb(
              new Error(
                `Invalid file type for field ${field.name}. Allowed: ${field.allowedExtensions.join(', ')}`
              )
            )
          }
          break
        }
      }
      cb(null, true)
    },
    limits: {
      fileSize: maxSizeKB * 1024
    }
  })

  return (req: Request, res: Response, next: NextFunction) => {
    const upload = multr.fields(
      fields.map(({ name, maxCount }) => ({ name, maxCount }))
    )

    upload(req, res, (err) => {
      if (err) {
        next(new ApiError(err.message))
      } else {
        next()
      }
    })
  }
}

;(async () => {
  try {
    if (fs.existsSync(destPath)) {
      await fs.promises.rm(destPath, { recursive: true, force: true })
      logger.info('Deleted uploads folder')
    }
  } catch (err) {
    logger.error('Failed to clean folder:', err)
  }
})()

export default uploadMiddleware
