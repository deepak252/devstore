import { Router } from 'express'
import {
  getAllRemoteFiles,
  uploadMedia,
  uploadProfileImage,
  uploadProjectMedia
} from '../controllers/uploadController'
import { authenticateRequest } from '../middlewares/authMiddleware'
import uploadMiddleware from '../middlewares/uploadMiddleware'
import { validateUserProject } from '../middlewares/projectMiddleware'

const router = Router()

router.use(authenticateRequest)

// router.post(
//   '/application',
//   uploadMiddleware([
//     {
//       name: 'file',
//       maxCount: 1,
//       maxSizeKB: 10240,
//       allowedExtensions: ['.apk', '.ipa']
//     }
//   ]),
//   uploadApplication
// )

router.post(
  '/media',
  uploadMiddleware([
    {
      name: 'file',
      maxCount: 1,
      maxSizeKB: 1024
    }
  ]),
  uploadMedia
)

router.post(
  '/profile-image',
  uploadMiddleware([
    {
      name: 'attachmentProfileImage',
      maxCount: 1,
      maxSizeKB: 1024
    }
  ]),
  uploadProfileImage
)

router.post(
  '/project-media/:projectId',
  validateUserProject,
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
      name: 'attachmentBanner',
      maxCount: 1,
      maxSizeKB: 1024,
      allowedExtensions: ['.png', '.jpg', '.jpeg']
    }
  ]),
  uploadProjectMedia
)
router.get('/all', getAllRemoteFiles)

export default router
