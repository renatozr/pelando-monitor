import { Router } from 'express'
import { StatusCodes } from 'http-status-codes'
import publicationsRouter from './publications'
import monitorsRouter from './monitors'

const router = Router()

router.get('/ping', (_req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Pong!' })
})

router.use('/publications', publicationsRouter)
router.use('/monitors', monitorsRouter)

export default router
