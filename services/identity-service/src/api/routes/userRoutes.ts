import { Router } from 'express'
import {
  checkUsername,
  deleteProfile,
  getProfile,
  getUserByUsername,
  updateProfile
} from '../controllers/userController.js'
import { requiredAuth } from '../middlewares/auth.js'
const router = Router()

router.get('/profile', requiredAuth, getProfile)
router.put('/profile', requiredAuth, updateProfile)
router.delete('/profile', requiredAuth, deleteProfile)
router.post('/check-username', checkUsername)
router.post('/:username', getUserByUsername)

export default router
