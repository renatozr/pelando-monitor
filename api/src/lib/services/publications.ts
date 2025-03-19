import puppeteer from 'puppeteer'
import { Publication } from '../models/Publication'

const TWO_MINUTES_IN_MILISECONDS = 120000
const THREE = 3

const delay = (seconds: number) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

export const scrapePublications = async (
  searchSlug: string
): Promise<Publication[] | undefined> => {
  let browser
  let attempt = 1

  try {
    browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    while (attempt <= THREE) {
      let page

      try {
        page = await browser.newPage()
        const url = `https://www.pelando.com.br/busca/${searchSlug}/promocoes`
        await page.goto(url, {
          waitUntil: 'domcontentloaded',
          timeout: TWO_MINUTES_IN_MILISECONDS,
        })

        try {
          await page.waitForSelector(
            'main > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div > ul'
          )
        } catch {
          throw new Error('Timeout waiting for publications list to load.')
        }

        const publications = await page.evaluate(() => {
          const publicationsElements = document.querySelectorAll(
            'main > div:nth-child(2) > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > div > ul > li'
          )

          return Array.from(publicationsElements).map(
            (publicationElement: Element) => {
              const titleElement = publicationElement.querySelector(
                'div > div:nth-child(2) > div:nth-child(3) > div:nth-child(1) > a:nth-child(3)'
              ) as HTMLAnchorElement | null

              const temperatureElement = publicationElement.querySelector(
                'div > div:nth-child(2) > div:nth-child(4) > div > div > div:nth-child(1) > span'
              ) as HTMLSpanElement | null
              const temperatureText = temperatureElement?.innerText ?? '0º'

              const expiredElement = publicationElement.querySelector(
                'div > div > div > div > div > p'
              ) as HTMLParagraphElement | null

              return {
                title: titleElement?.title ?? 'Título não encontrado',
                url: titleElement?.href ?? window.location.href,
                temperature: parseInt(temperatureText.slice(0, -1), 10),
                isExpired: !!expiredElement,
              }
            }
          )
        })

        return publications
      } catch (error) {
        console.error(
          `Error fetching publications (attempt ${attempt} of ${THREE}):`,
          error
        )

        if (attempt < THREE) {
          console.log(`Retrying in ${THREE} seconds...`)
          await delay(THREE)
        }

        attempt++
      } finally {
        if (page) {
          await page.close()
        }
      }
    }

    console.log('Failed to fetch publications after multiple attempts.')
    return undefined
  } catch (error) {
    console.error('Critical error launching Puppeteer:', error)
    return undefined
  } finally {
    if (browser) {
      await browser.close()
    }
  }
}
