import { NextFunction, Request, Response } from 'express'
import { ApiResponse, ResponseSuccess } from './ApiResponse'

const asyncHandler = (
  controller: (req: Request, res: Response) => Promise<ResponseSuccess | any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res)
      .then((result) => {
        if (result instanceof ApiResponse) {
          return res.status(result.code).json(result)
        } else {
          return res.json(result)
        }
      })
      .catch(next)
  }
}

export default asyncHandler
