import {
  CONTENT_SERVICE_URL,
  IDENTITY_SERVICE_URL,
  PROJECT_SERVICE_URL,
  UPLOAD_SERVICE_URL
} from './env'

export const proxyRoutes = [
  {
    from: '/v1/auth',
    to: IDENTITY_SERVICE_URL,
    requireAuth: false
  },
  {
    from: '/v1/user/check-username',
    to: IDENTITY_SERVICE_URL,
    requireAuth: false
  },
  {
    from: '/v1/user',
    to: IDENTITY_SERVICE_URL,
    requireAuth: true
  },
  {
    from: '/v1/content',
    to: CONTENT_SERVICE_URL,
    requireAuth: false
  },
  {
    from: '/v1/projects',
    to: PROJECT_SERVICE_URL,
    requireAuth: true
  },
  {
    from: '/v1/upload',
    to: UPLOAD_SERVICE_URL,
    requireAuth: true,
    parseReqBody: false
  }
]
