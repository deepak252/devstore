import { Router } from 'express'
import {
  checkUsername,
  deleteProfile,
  getProfile,
  getUserByUsername,
  updateProfile
} from '../controllers/userController.js'
import { requireAuth } from '../middlewares/auth.js'
const router = Router()

router.get('/profile', requireAuth, getProfile)
router.put('/profile', requireAuth, updateProfile)
router.delete('/profile', requireAuth, deleteProfile)
router.post('/check-username', checkUsername)
router.get('/profile/:username', getUserByUsername)

export default router
