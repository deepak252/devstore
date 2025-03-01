import { Request, Response, NextFunction } from 'express'

export const requiredAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'] as string
  if (!userId) {
    throw new Error('Unauthorized access')
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
