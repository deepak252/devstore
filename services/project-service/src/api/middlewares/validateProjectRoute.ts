import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { Platform } from '../../constants/enums'

export const validateProjectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const platform = req.query.platform as Platform
  if (!Object.values(Platform).includes(platform)) {
    throw new ApiError('Not found', 404)
  }
  req.platform = platform
  next()
}
