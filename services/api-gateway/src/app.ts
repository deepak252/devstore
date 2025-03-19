import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import proxy from 'express-http-proxy'
import { ResponseSuccess } from './utils/ApiResponse.js'
import { errorHandler } from './middlewares/errorHandler.js'
// import { rateLimiter } from './middlewares/rateLimiter.js'
import { validateAccessToken } from './middlewares/authMiddleware.js'
import { generateProxyOptions } from './utils/proxyUtil.js'
import { proxyRoutes } from './config/index.js'
import logger from './utils/logger.js'

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

app.get('/', (req, res) => {
  res.json(new ResponseSuccess('API Gateway is Up'))
})

app.use(errorHandler)
export default app
