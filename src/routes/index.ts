import { Router } from 'express'
import { postRoutes } from './postRoutes'
import { petRoutes } from './petRoutes'

export const router = Router()

router.use('/post', postRoutes)
router.use('/pet', petRoutes)