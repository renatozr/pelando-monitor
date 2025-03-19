import { Monitor } from '@prisma/client'
import { prisma } from '../prisma'
import { MutateMonitorBody } from '../dtos/MutateMonitorBody'

export const findMonitors = async (): Promise<Monitor[] | undefined> => {
  try {
    const monitors = await prisma.monitor.findMany()

    return monitors
  } catch (error) {
    console.error('Error finding monitors:', error)
    return undefined
  }
}

export const createMonitor = async (
  monitor: MutateMonitorBody
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

export const findMonitorById = async (
  id: string
): Promise<Monitor | undefined> => {
  try {
    const monitor = await prisma.monitor.findUnique({ where: { id } })

    if (!monitor) return undefined

    return monitor
  } catch (error) {
    console.error('Error finding monitor:', error)
    return undefined
  }
}

export const updateMonitor = async (
  id: string,
  monitor: MutateMonitorBody
): Promise<Monitor | undefined> => {
  const { title, searchSlug, targetTemperature, disabled } = monitor

  try {
    const updatedMonitor = await prisma.monitor.update({
      where: { id },
      data: {
        title,
        searchSlug,
        targetTemperature,
        disabled,
      },
    })

    return updatedMonitor
  } catch (error) {
    console.error('Error updating monitor:', error)
    return undefined
  }
}

export const deleteMonitor = async (id: string): Promise<true | undefined> => {
  try {
    await prisma.monitor.delete({ where: { id } })

    return true
  } catch (error) {
    console.error('Error deleting monitor:', error)
    return undefined
  }
}
