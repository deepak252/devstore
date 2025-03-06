import fs from 'fs'
import logger from './logger.js'

export const getFileExtension = (filename = '') => {
  const split = filename.split('.')
  if (split && split.length > 1) {
    return split.pop()
  }
}

export const removeFile = (filePath: string) => {
  if (!filePath) return
  fs.unlink(filePath, (err) => {
    if (err) {
      logger.error(`Error while removing file: ${filePath}`, err)
      // throw err;
    }
  })
}

export const removeFiles = (filePaths: string[]) => {
  filePaths.forEach((fp) => removeFile(fp))
}
