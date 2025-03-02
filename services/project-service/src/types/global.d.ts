import 'express'
import { Platform } from '../constants/enums'

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string
      }
      platform?: Platform
    }
  }
}
