import { Router } from 'express'
import {
  createProject,
  deleteProject,
  getProjectDetails,
  getProjects,
  updateProject
} from '../controllers/projectController'
import { optionalAuth, requireAuth } from '../middlewares/auth'
import { validateProjectRoute } from '../middlewares/validateProjectRoute'

const router = Router()

router.get('/all', validateProjectRoute, optionalAuth, getProjects) // /project/all?type=game
router.post('/create', requireAuth, createProject)
router.put('/:projectId', requireAuth, updateProject)
router.get('/:projectId', optionalAuth, getProjectDetails)
router.delete('/:projectId', requireAuth, deleteProject)

export default router
