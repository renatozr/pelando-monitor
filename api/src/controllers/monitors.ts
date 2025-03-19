import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import * as monitorsService from '../lib/services/monitors'
import { isSlug } from '../lib/utils/isSlug'
import { MutateMonitorBody } from '../lib/dtos/MutateMonitorBody'
import { isUUID } from 'validator'

export const getMonitors = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const monitors = await monitorsService.findMonitors()

  if (!monitors) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error has occurred while getting monitors' })

    return
  }

  res.status(StatusCodes.OK).json(monitors)
}

export const createMonitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, searchSlug, targetTemperature, disabled }: MutateMonitorBody =
    req.body

  if (!title || !searchSlug || targetTemperature === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Missing required body fields' })

    return
  }

  if (!isSlug(searchSlug)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'searchSlug body field has an invalid slug format' })

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

export const updateMonitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params
  const { title, searchSlug, targetTemperature, disabled }: MutateMonitorBody =
    req.body

  if (!isUUID(id)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'id param has an invalid UUID format' })

    return
  }

  if (!title || !searchSlug || targetTemperature === undefined) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Missing required body fields' })

    return
  }

  if (!isSlug(searchSlug)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'searchSlug body field has an invalid slug format' })

    return
  }

  const existingMonitor = await monitorsService.findMonitorById(id)

  if (!existingMonitor) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Monitor with id ${id} not found` })

    return
  }

  const updatedMonitor = await monitorsService.updateMonitor(id, {
    title,
    searchSlug,
    targetTemperature,
    disabled,
  })

  if (!updatedMonitor) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error has occurred while updating monitor' })

    return
  }

  res.status(StatusCodes.OK).json(updatedMonitor)
}

export const deleteMonitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params

  if (!isUUID(id)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'id param has an invalid UUID format' })

    return
  }

  const existingMonitor = await monitorsService.findMonitorById(id)

  if (!existingMonitor) {
    res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: `Monitor with id ${id} not found` })

    return
  }

  const deletionSucceed = await monitorsService.deleteMonitor(id)

  if (!deletionSucceed) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error has occurred while deleting monitor' })

    return
  }

  res.status(StatusCodes.NO_CONTENT).send()
}
