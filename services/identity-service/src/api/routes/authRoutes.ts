import { Router } from 'express'
import {
  signInUser,
  signUpUser,
  signOutUser,
  verifyEmail,
  resendEmailVerification
} from '../controllers/authController.js'
const router = Router()

router.post('/sign-up', signUpUser)
router.post('/sign-in', signInUser)
router.post('/sign-out', signOutUser)
router.post('/resend-verification', resendEmailVerification)
router.post('/verify-email', verifyEmail)

export default router
