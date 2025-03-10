import { Router } from 'express'
import {
  createCategory,
  getCategories
} from '../controllers/categoryController'

const router = Router()

router.get('/categories', getCategories)
router.post('/categories/create', createCategory)

export default router
