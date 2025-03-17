import { Router } from 'express'
import { getPublications } from '../controllers/publications'

const router = Router()

router.get('/:searchSlug', getPublications)

export default router
