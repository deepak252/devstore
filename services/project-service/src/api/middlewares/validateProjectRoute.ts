import { Request, Response, NextFunction } from 'express'
import { ProjectType } from '../../constants/enums'

export const validateProjectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const projectType = req.query.type as ProjectType
  if (!Object.values(ProjectType).includes(projectType)) {
    req.projectType = ProjectType.all
  } else {
    req.projectType = projectType
  }

  next()
}
