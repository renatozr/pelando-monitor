import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { scrapePublications } from '../lib/services/publications'
import { isSlug } from '../lib/utils/isSlug'

export const getPublications = async (
  req: Request,
  res: Response
): Promise<void> => {
  const searchSlug = req.params.searchSlug

  if (!isSlug(searchSlug)) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'searchSlug param has an invalid slug format' })

    return
  }

  const publications = await scrapePublications(searchSlug)

  if (!publications) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: 'An error has occurred while fetching publications' })

    return
  }

  res.status(StatusCodes.OK).json(publications)
}
