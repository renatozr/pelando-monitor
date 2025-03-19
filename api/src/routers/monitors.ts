import { Router } from 'express'
import {
  getMonitors,
  createMonitor,
  updateMonitor,
  deleteMonitor,
} from '../controllers/monitors'

const router = Router()

router.get('/', getMonitors)
router.post('/', createMonitor)
router.put('/:id', updateMonitor)
router.delete('/:id', deleteMonitor)

export default router
