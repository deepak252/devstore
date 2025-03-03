import { USER_PROFILE_API } from '@/constants'
import { getRequest } from '@/services/api'

export default class UserService {
  static getUserProfile = async () => {
    return await getRequest(USER_PROFILE_API)
  }
}
