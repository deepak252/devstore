import { Router } from 'express'
import {
  createProject,
  deleteProject,
  getProjects,
  updateProject
} from '../controllers/metadataController'
import { optionalAuth, requireAuth } from '../middlewares/auth'

const router = Router()

router.get('/metadata', getProjects) // /project/all?type=game
// router.post('/create', requireAuth, createProject)
// router.put('/:projectId', requireAuth, updateProject)
// router.delete('/:projectId', requireAuth, deleteProject)

export default router
