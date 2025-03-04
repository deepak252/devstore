/* eslint-disable @typescript-eslint/no-unused-vars */

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { ResponseFailure, ResponseSuccess } from './utils/ApiResponse.js'
import { errorHandler } from './middlewares/errorHandler.js'
import logger from './utils/logger.js'
import { rateLimiter } from './middlewares/rateLimiter.js'
import proxy, { ProxyOptions } from 'express-http-proxy'
import {
  IDENTITY_SERVICE_URL,
  PROJECT_SERVICE_URL,
  UPLOAD_SERVICE_URL
} from './config/env.js'
import { validateAccessToken } from './middlewares/authMiddleware.js'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(
  cors({
    origin: '*'
    // credentials: true
  })
)
app.use(rateLimiter)

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`)
  next()
})

const proxyOptions: ProxyOptions = {
  proxyReqPathResolver: function (req) {
    return req.originalUrl.replace(/^\/v1/, '/api')
  },
  proxyErrorHandler: function (err, res, next) {
    logger.error(`Proxy error: `, err)
    res
      .status(500)
      .json(new ResponseFailure(`Internal server error: ${err.message}`))
  }
}
// api-gateway -> /v1/auth/register -> 3000
// identity -> /api/auth/register -> 3001

// Setting up proxy for identity service
app.use(
  '/v1/auth',
  proxy(IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers!['content-type'] = 'application/json'
      return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from identity-service: ${proxyRes.statusCode}`
      )
      return proxyResData
    }
  })
)

app.use(
  '/v1/user',
  validateAccessToken,
  proxy(IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers!['content-type'] = 'application/json'
      proxyReqOpts.headers!['x-user-id'] = srcReq.user.userId
      return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from identiy-service: ${proxyRes.statusCode}`
      )
      return proxyResData
    }
  })
)

// Setting up proxy for project service
app.use(
  '/v1/project',
  validateAccessToken,
  proxy(PROJECT_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers!['content-type'] = 'application/json'
      proxyReqOpts.headers!['x-user-id'] = srcReq.user.userId
      return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from project-service: ${proxyRes.statusCode}`
      )
      return proxyResData
    }
  })
)

// Setting up proxy for upload service
app.use(
  '/v1/upload',
  validateAccessToken,
  proxy(UPLOAD_SERVICE_URL, {
    ...proxyOptions,
    parseReqBody: false, // Important for multipart forms
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
      proxyReqOpts.headers!['x-user-id'] = srcReq.user.userId
      if (!srcReq.headers!['content-type']?.startsWith('multipart/form-data')) {
        proxyReqOpts.headers!['content-type'] = 'application/json'
      }
      return proxyReqOpts
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
      logger.info(
        `Response received from upload-service: ${proxyRes.statusCode}`
      )
      return proxyResData
    }
  })
)

app.get('/', (req, res) => {
  res.json(new ResponseSuccess('API Gateway is Up'))
})

app.use(errorHandler)
export default app
