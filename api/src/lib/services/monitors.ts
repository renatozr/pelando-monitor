import { Monitor } from '@prisma/client'
import { prisma } from '../prisma'
import { CreateMonitorBody } from '../dtos/CreateMonitorBody'

export const fetchMonitors = async (): Promise<Monitor[] | undefined> => {
  try {
    const monitors = await prisma.monitor.findMany()

    return monitors
  } catch (error) {
    console.error('Error fetching monitors:', error)
    return undefined
  }
}

export const createMonitor = async (
  monitor: CreateMonitorBody
): Promise<Monitor | undefined> => {
  const { title, searchSlug, targetTemperature, disabled } = monitor
  try {
    const newMonitor = await prisma.monitor.create({
      data: {
        title,
        searchSlug,
        targetTemperature,
        disabled: disabled || false,
      },
    })

    return newMonitor
  } catch (error) {
    console.error('Error creating monitor:', error)
    return undefined
  }
}
