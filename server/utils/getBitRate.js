import { once } from 'events'
import { executeSoxCommand } from "./commands.js"
import config from "./config.js"
import { logger } from "./logger.js"

const { constants: { fallbackBiteRate } } = config

export async function getBitRate(song) {
  try {
    const args = ['--i', '-B', song]

    const { stderr, stdout } = executeSoxCommand(args)

    await Promise.all([
      once(stdout, 'readable'),
      once(stderr, 'readable')
    ])

    const [success, error] = [stdout, stderr].map(stream => stream.read())

    if (error) return await Promise.reject(error)

    return success
      .toString()
      .trim()
      .replace(/k/, '000')
  } catch (error) {
    logger.error(`Error at bitrate: ${error}`)

    return fallbackBiteRate
  }
}