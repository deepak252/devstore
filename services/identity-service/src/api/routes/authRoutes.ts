import { Router } from 'express'
import {
  signInUser,
  signUpUser,
  signOutUser
} from '../controllers/authController.js'
const router = Router()

router.post('/sign-up', signUpUser)
router.post('/sign-in', signInUser)
router.post('/sign-out', signOutUser)

export default router
