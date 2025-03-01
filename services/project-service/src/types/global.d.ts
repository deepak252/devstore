import 'express'
import { ProjectType } from './project.types'

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string
      }
      projectType?: ProjectType
    }
  }
}
