import 'express'
import { Platform, ProjectType } from '../constants/enums'

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string
      }
      platform?: Platform
      projectType?: ProjectType
    }
  }
}
