import { Router } from 'express'
import mediaRouter from './uploadRoutes'
import { ResponseSuccess } from '../utils/ApiResponse'

const router = Router()

// const wait = async (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms))

// router.use(async (req, res, next) => {
//   await wait(500)
//   next()
// })

router.use('/upload', mediaRouter)

router.get('/', (req, res) => {
  res.json(new ResponseSuccess('Upload Service is Up'))
})

export default router
