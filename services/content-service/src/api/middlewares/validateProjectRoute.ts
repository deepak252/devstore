import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { ProjectType } from '../../constants/enums'

export const validateProjectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projectType = req.query.type as ProjectType
  if (!Object.values(ProjectType).includes(projectType)) {
    throw new ApiError('Not found', 404)
  }
  req.projectType = projectType
  next()
}
