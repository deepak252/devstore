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

router.post('/application', uploadMiddleware({}), uploadApplication)
router.post('/media', uploadMiddleware({}), uploadMedia)
router.get('/all', getAllRemoteFiles)

export default router
