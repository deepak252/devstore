import { BANNER_API, CREATE_PROJECT_API, PROJECTS_API } from '@/constants'
import { getRequest, postRequest } from '@/services/api'
import { SaveProjectPayload } from '@/shared.types'

export default class AppsService {
  static getApps = async () => {
    return await getRequest(PROJECTS_API, {
      params: {
        platform: 'app',
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
        platform: 'app',
      },
    })
  }
}
