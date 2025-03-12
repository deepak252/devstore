import { METADATA_API } from '@/constants'
import { getRequest } from '@/services/api'

export default class ContentService {
  static getMetadata = async () => {
    return await getRequest(METADATA_API)
  }
}
