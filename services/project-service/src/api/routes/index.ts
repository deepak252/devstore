import { Router } from 'express'
import projectRouter from './projectRoutes'
import { ResponseSuccess } from '../utils/ApiResponse'

const router = Router()

// const wait = async (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms))

// router.use(async (req, res, next) => {
//   await wait(500)
//   next()
// })

router.get('/', (req, res) => {
  res.json(new ResponseSuccess('Project Service is Up'))
})

router.use('/projects', projectRouter)

export default router
