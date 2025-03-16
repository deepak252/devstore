import { Router } from 'express'
import {
  checkProjectExists,
  createProject,
  deleteProject,
  getProjectDetails,
  getProjects,
  updateProject
} from '../controllers/projectController'
import { optionalAuth, requireAuth } from '../middlewares/auth'
import { validateProjectRoute } from '../middlewares/validateProjectRoute'

const router = Router()

router.get('/', validateProjectRoute, optionalAuth, getProjects) // /project/all?type=game
router.post('/create', requireAuth, createProject)
router.put('/:projectId', requireAuth, updateProject)
router.get('/:projectId', optionalAuth, getProjectDetails)
router.delete('/:projectId', requireAuth, deleteProject)
router.post('/exists', checkProjectExists)

export default router

// router.post(
//   '/create',
//   requireAuth,
//   uploadMiddleware([
//     {
//       name: 'attachmentIcon',
//       maxCount: 1,
//       maxSizeKB: 512,
//       allowedExtensions: ['.png', '.jpg', '.jpeg']
//     },
//     {
//       name: 'attachmentImages',
//       maxCount: 5,
//       maxSizeKB: 1024,
//       allowedExtensions: ['.png', '.jpg', '.jpeg']
//     },
//     {
//       name: 'attachmentGraphic',
//       maxCount: 1,
//       maxSizeKB: 1024,
//       allowedExtensions: ['.png', '.jpg', '.jpeg']
//     }
//   ]),
//   createProject
// )
