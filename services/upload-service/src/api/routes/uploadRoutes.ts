import { Router } from 'express'
import {
  getAllRemoteFiles,
  uploadApplication,
  uploadMedia
} from '../controllers/uploadController'
import { authenticateRequest } from '../middlewares/authMiddleware'
import uploadMiddleware from '../middlewares/uploadMiddleware'

const router = Router()

router.use(authenticateRequest)

router.post(
  '/application',
  uploadMiddleware([
    {
      name: 'file',
      maxCount: 1,
      maxSizeKB: 10240,
      allowedExtensions: ['.apk', '.ipa']
    }
  ]),
  uploadApplication
)

router.post(
  '/media',
  uploadMiddleware([
    {
      name: 'attachmentIcon',
      maxCount: 1,
      maxSizeKB: 512,
      allowedExtensions: ['.png', '.jpg', '.jpeg']
    }
  ]),
  uploadMedia
)

router.post(
  '/project-media',
  uploadMiddleware([
    {
      name: 'attachmentIcon',
      maxCount: 1,
      maxSizeKB: 512,
      allowedExtensions: ['.png', '.jpg', '.jpeg']
    },
    {
      name: 'attachmentImages',
      maxCount: 5,
      maxSizeKB: 1024,
      allowedExtensions: ['.png', '.jpg', '.jpeg']
    },
    {
      name: 'attachmentGraphic',
      maxCount: 1,
      maxSizeKB: 1024,
      allowedExtensions: ['.png', '.jpg', '.jpeg']
    }
  ]),
  uploadMedia
)
router.get('/all', getAllRemoteFiles)

export default router
