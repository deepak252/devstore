import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import proxy from 'express-http-proxy'
import axios from 'axios'
import { ResponseSuccess } from './utils/ApiResponse.js'
import { errorHandler } from './middlewares/errorHandler.js'
// import { rateLimiter } from './middlewares/rateLimiter.js'
import { validateAccessToken } from './middlewares/authMiddleware.js'
import { generateProxyOptions } from './utils/proxyUtil.js'
import { proxyRoutes } from './config/index.js'
import logger from './utils/logger.js'
import {
  CONTENT_SERVICE_URL,
  IDENTITY_SERVICE_URL,
  PROJECT_SERVICE_URL,
  UPLOAD_SERVICE_URL
} from './config/env.js'

const app = express()

app.use(express.json())
app.use(helmet())
app.use(
  cors({
    origin: '*'
    // credentials: true
  })
)
// app.use(rateLimiter)

app.use((req, res, next) => {
  logger.info(`Received ${req.method} request to ${req.url}`)
  next()
})

// api-gateway -> /v1/auth/register -> 3000
// identity -> /api/auth/register -> 3001

for (const { from, to, requireAuth, parseReqBody } of proxyRoutes) {
  app.use(
    from,
    (req, res, next) => {
      validateAccessToken(
        req,
        res,
        next,
        req.method !== 'GET' && requireAuth === true
      )
    },
    proxy(to, generateProxyOptions({ parseReqBody }))
  )
}

const services = [
  { name: 'identity', url: IDENTITY_SERVICE_URL },
  { name: 'content', url: CONTENT_SERVICE_URL },
  { name: 'project', url: PROJECT_SERVICE_URL },
  { name: 'upload', url: UPLOAD_SERVICE_URL }
]

app.get('/keep-alive', async (_, res) => {
  const pingResults = await Promise.allSettled(
    services.map(async ({ name, url }) => {
      try {
        const response = await axios.get(`${url}/health`, { timeout: 10000 })
        return response.data
      } catch (err: any) {
        return {
          name,
          status: err?.code,
          error: err?.message || 'Unknown error'
        }
      }
    })
  )

  const results = pingResults.map((result) =>
    result.status === 'fulfilled'
      ? result.value
      : { error: 'Unexpected promise rejection' }
  )

  console.log('Keep-alive summary:', results)
  res.status(200).json({ message: 'Pinged all services', results })
})

app.get('/health', (_, res) => {
  res.send('API Gateway OK')
})

app.get('/', (req, res) => {
  res.json(new ResponseSuccess('API Gateway is Up'))
})

app.use(errorHandler)
export default app
