import { Router } from 'express'
import {
  createCategory,
  getCategories
} from '../controllers/categoryController'

const router = Router()

router.get('/', getCategories)
router.post('/create', createCategory)

export default router
