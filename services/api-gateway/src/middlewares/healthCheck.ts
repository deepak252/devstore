import axios from 'axios'
import { Request, Response, NextFunction } from 'express'
import { redisClient } from '../config/redis'
import logger from '../utils/logger'
import { KEEP_ALIVE_WORKER_URL } from '../config/env'

export const healthCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info(`Received ${req.method} request to ${req.url}`)
  if (req.url.startsWith('/health')) {
    return next()
  }

  try {
    const lastCheck = (await redisClient.get('healthcheck:last')) || '0'
    const now = Date.now()
    if (!lastCheck || now - Number(lastCheck) > 840000) {
      /* > 14 mins, Make Keep Alive Call */
      logger.info(`Diff (${lastCheck} - ${now}): ${now - Number(lastCheck)}`)
      const response = await axios.get(KEEP_ALIVE_WORKER_URL, {
        timeout: 120000
      })
      logger.info(
        `Keep Alive: ${response.status}, ${JSON.stringify(response.data)}`
      )
    }
  } catch (e) {
    logger.error('Error: ', e)
  }
  next()
}
