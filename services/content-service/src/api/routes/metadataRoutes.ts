import { Router } from 'express'
import { getMetadata } from '../controllers/metadataController'

const router = Router()

router.get('/', getMetadata)

export default router
