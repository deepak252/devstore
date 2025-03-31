import { Router } from 'express'
import {
  createCategory,
  getCategories
} from '../controllers/likeController'

const router = Router()

router.get('/', getCategories)
router.post('/create', createCategory)

export default router
