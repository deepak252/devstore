import { USER_API, USER_PROFILE_API, USER_PROJECTS_API } from '@/constants'
import { getRequest, putRequest } from '@/services/api'
import { User } from './user.types'

export default class UserService {
  static getUserProfile = async (username?: string) => {
    return await getRequest(
      username ? `${USER_PROFILE_API}/${username}` : USER_PROFILE_API
    )
  }

  static updateUserProfile = async (data: Partial<User>) => {
    return await putRequest(USER_PROFILE_API, { data })
  }

  static getUserProjects = async (userId: string) => {
    return await getRequest(`${USER_PROJECTS_API}/${userId}`)
  }

  static getAllUsers = async () => {
    return await getRequest(`${USER_API}/all`)
  }
}
