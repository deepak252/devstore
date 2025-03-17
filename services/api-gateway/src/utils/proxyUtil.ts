/* eslint-disable @typescript-eslint/no-unused-vars */

import { ProxyOptions } from 'express-http-proxy'
import { ResponseFailure } from './ApiResponse'
import logger from './logger'

export const generateProxyOptions = ({
  // contentType = 'application/json',
  parseReqBody
}: {
  contentType?: string
  parseReqBody?: boolean
} = {}): ProxyOptions => {
  return {
    parseReqBody,
    proxyReqPathResolver: function (req) {
      return req.originalUrl.replace(/^\/v1/, '/api')
    },
    proxyErrorHandler: function (err, res, next) {
      logger.error(`Proxy error: `, err)
      res
        .status(500)
        .json(new ResponseFailure(`Internal server error: ${err.message}`))
    },
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      // proxyReqOpts.headers!['content-type'] = contentType
      if (srcReq.user?.userId) {
        proxyReqOpts.headers!['x-user-id'] = srcReq.user.userId
      }
      return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from ${userReq.originalUrl}: ${proxyRes.statusCode}`
      )
      return proxyResData
    }
  }
}
