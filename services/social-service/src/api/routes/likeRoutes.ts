import { Router } from 'express'
import { createBanner, getBanners } from '../controllers/followingController'
import { validateProjectRoute } from '../middlewares/validateProjectRoute'

const router = Router()

router.get('/', validateProjectRoute, getBanners)
router.post('/create', createBanner)

export default router
