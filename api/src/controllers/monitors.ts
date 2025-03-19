import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as monitorsService from '../lib/services/monitors'
import { isSlug } from '../lib/utils/isSlug'
import { CreateMonitorBody } from '../lib/dtos/CreateMonitorBody'

export const getMonitors = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const monitors = await monitorsService.findMonitors()

  if (!monitors) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error has occurred while fetching monitors' })

    return
  }

  res.status(StatusCodes.OK).json(monitors)
}

export const createMonitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, searchSlug, targetTemperature, disabled }: CreateMonitorBody =
    req.body

  if (!title || !searchSlug || targetTemperature === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Missing required fields' })

    return
  }

  if (!isSlug(searchSlug)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'searchSlug body key has an invalid slug format' })

    return
  }

  const newMonitor = await monitorsService.createMonitor({
    title,
    searchSlug,
    targetTemperature,
    disabled,
  })

  if (!newMonitor) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error has occurred while creating monitor' })

    return
  }

  res.status(StatusCodes.CREATED).json(newMonitor)
}
