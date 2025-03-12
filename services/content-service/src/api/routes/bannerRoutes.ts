import { Router } from 'express'
import { createBanner, getBanners } from '../controllers/bannerController'

const router = Router()

router.get('/', getBanners)
router.post('/create', createBanner)

export default router
