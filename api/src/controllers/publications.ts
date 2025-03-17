import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { fetchPublications } from '../services/publications'

const isSlug = (slug: string): boolean => {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

  return slugPattern.test(slug)
}

export const getPublications = async (req: Request, res: Response) => {
  const searchSlug = req.params.searchSlug

  if (!isSlug(searchSlug)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'Search slug param has an invalid slug format' })
  }

  const publications = await fetchPublications(searchSlug)

  if (!publications) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error has occurred while fetching publications' })
  }

  res.status(StatusCodes.OK).json(publications)
}
