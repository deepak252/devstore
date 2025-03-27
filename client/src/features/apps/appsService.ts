import {
  BANNER_API,
  CREATE_PROJECT_API,
  HOME_PROJECTS_API,
  PROJECTS_API,
} from '@/constants'
import { getRequest, postRequest } from '@/services/api'
import { SaveProjectPayload } from '@/shared.types'

export default class AppsService {
  static getApps = async () => {
    return await getRequest(PROJECTS_API, {
      params: {
        type: 'app',
      },
    })
  }

  static getHomeApps = async () => {
    return await getRequest(HOME_PROJECTS_API, {
      params: {
        type: 'app',
      },
    })
  }

  static createApp = async (data: SaveProjectPayload) => {
    return await postRequest(CREATE_PROJECT_API, { data })
  }

  static getAppDetails = async (projectId: string) => {
    return await getRequest(`${PROJECTS_API}/${projectId}`)
  }

  static getAppBanners = async () => {
    return await getRequest(BANNER_API, {
      params: {
        type: 'app',
      },
    })
  }
}
