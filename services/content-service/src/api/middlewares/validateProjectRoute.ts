import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { Platform } from '../../constants/enums'

export const validateProjectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projectType = req.query.type as Platform
  if (!Object.values(Platform).includes(projectType)) {
    throw new ApiError('Not found', 404)
  }
  req.platform = projectType
  next()
}
