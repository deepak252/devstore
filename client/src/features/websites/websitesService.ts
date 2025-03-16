import { BANNER_API, CREATE_PROJECT_API, PROJECTS_API } from '@/constants'
import { getRequest, postRequest } from '@/services/api'
import { SaveProjectPayload } from '@/shared.types'

export default class WebsitesService {
  static getWebsites = async () => {
    return await getRequest(PROJECTS_API, {
      params: {
        platform: 'website',
      },
    })
  }

  static createWebsite = async (data: SaveProjectPayload) => {
    return await postRequest(CREATE_PROJECT_API, { data })
  }

  static getWebsiteDetails = async (projectId: string) => {
    return await getRequest(`${PROJECTS_API}/${projectId}`)
  }

  static getWebsiteBanners = async () => {
    return await getRequest(BANNER_API, {
      params: {
        platform: 'website',
      },
    })
  }
}
