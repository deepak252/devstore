import { USER_PROFILE_API, USER_PROJECTS_API } from '@/constants'
import { getRequest, putRequest } from '@/services/api'
import { User } from './user.types'

export default class UserService {
  static getUserProfile = async () => {
    return await getRequest(USER_PROFILE_API)
  }

  static updateUserProfile = async (data: Partial<User>) => {
    return await putRequest(USER_PROFILE_API, { data })
  }

  static getUserProjects = async (userId: string) => {
    return await getRequest(`${USER_PROJECTS_API}/${userId}`)
  }
}
