import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import publicationsRouter from './publications'

const router = Router()

router.get('/ping', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Pong!' })
})

router.use('/publications', publicationsRouter)

export default router
