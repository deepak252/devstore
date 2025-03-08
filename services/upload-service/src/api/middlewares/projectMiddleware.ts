import axios from 'axios'
import { Request, Response, NextFunction } from 'express'
import { ApiError } from '../utils/ApiError'
import { PROJECT_SERVICE_URL } from '../../config/env'

export const validateUserProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { projectId } = req.params
  const userId = req.user.userId
  try {
    const response = await axios.post(
      `${PROJECT_SERVICE_URL}/api/project/exists`,
      {
        userId,
        projectId
      }
    )
    if (!response.data?.data?.exists) {
      throw new Error('Project not found')
    }
    next()
  } catch (e: any) {
    next(new ApiError(e?.message || 'Invalid request', 404))
  }
}
