import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'] as string
  if (!userId) {
    throw new ApiError('Unauthorized access', 401)
  }

  req.user = { userId }
  next()
}

export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'] as string
  req.user = { userId }
  next()
}
