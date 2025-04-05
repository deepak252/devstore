import {
  BANNER_API,
  CREATE_PROJECT_API,
  HOME_PROJECTS_API,
  PROJECTS_API,
} from '@/constants'
import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from '@/services/api'
import { SaveProjectPayload } from '@/shared.types'
import { ProjectSearchFilter } from './projects.types'

export default class ProjectsService {
  static getProjects = async (filter?: ProjectSearchFilter) => {
    return await getRequest(PROJECTS_API, {
      params: filter,
    })
  }

  static createProject = async (data: SaveProjectPayload) => {
    return await postRequest(CREATE_PROJECT_API, { data })
  }

  static updateProject = async (data: Partial<SaveProjectPayload>) => {
    return await putRequest(`${PROJECTS_API}/${data._id}`, { data })
  }

  static getProjectDetails = async (projectId: string) => {
    return await getRequest(`${PROJECTS_API}/${projectId}`)
  }

  static deleteProject = async (projectId: string) => {
    return await deleteRequest(`${PROJECTS_API}/${projectId}`)
  }

  static getProjectBanners = async () => {
    return await getRequest(BANNER_API, {
      params: {
        type: 'all',
      },
    })
  }

  static getHomeProjects = async () => {
    return await getRequest(HOME_PROJECTS_API, {
      params: {
        type: 'all',
      },
    })
  }
}
