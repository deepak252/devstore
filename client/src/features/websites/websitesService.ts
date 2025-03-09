import { CREATE_PROJECT_API } from '@/constants'
import { postRequest } from '@/services/api'
import { SaveProjectPayload } from '@/shared.types'

export default class WebsitesService {
  static createWebsite = async (data: SaveProjectPayload) => {
    return await postRequest(CREATE_PROJECT_API, { data })
  }
}
