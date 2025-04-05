import { all, put, select, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { apiWorker, uploadTask } from '@/services/api'
import { UPLOAD_PROJECT_MEDIA_API } from '@/constants'
import {
  createProject,
  createProjectFailure,
  createProjectSuccess,
  deleteProject,
  deleteProjectFailure,
  deleteProjectSuccess,
  editProject,
  editProjectFailure,
  editProjectSuccess,
  getHomeProjects,
  getHomeProjectsFailure,
  getHomeProjectsSuccess,
  getProjectBanners,
  getProjectBannersFailure,
  getProjectBannersSuccess,
  getProjectDetails,
  getProjectDetailsFailure,
  getProjectDetailsSuccess,
  getProjects,
  getProjectsFailure,
  getProjectsSuccess,
  uploadProjectMediaFailure,
  uploadProjectMediaSuccess,
} from './projectsSlice'
import ProjectsService from './projectsService'
import {
  Platform,
  ProjectFormValues,
  UploadProjectMediaPayload,
} from '@/shared.types'
import { ProjectSearchFilter } from './projects.types'
import { RootState } from '@/store'
import { getUserProjects } from '../user/userSlice'

function* getProjectsWorker(
  action: PayloadAction<ProjectSearchFilter | undefined>
): Generator {
  yield* apiWorker(ProjectsService.getProjects, action.payload, {
    onSuccess: function* (response) {
      yield put(getProjectsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getProjectsFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* createProjectWorker(
  action: PayloadAction<ProjectFormValues>
): Generator {
  const {
    attachmentIcon,
    attachmentImages,
    attachmentBanner,
    categories,
    platforms,
    ...rest
  } = action.payload
  yield* apiWorker(
    ProjectsService.createProject,
    {
      ...rest,
      categories: categories?.flatDropdownOptions('label'),
      platforms: platforms?.flatDropdownOptions('value') as Platform[],
    },
    {
      onSuccess: function* (response) {
        if (attachmentIcon || attachmentImages?.length || attachmentBanner) {
          yield uploadMediaWorker({
            projectId: response.data?.data?._id,
            attachmentIcon,
            attachmentBanner,
            attachmentImages: attachmentImages?.map(({ file }) => file),
          })
        }
        yield put(createProjectSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          createProjectFailure(error?.message || 'Something went wrong')
        )
      },
    }
  )
}

function* editProjectWorker(
  action: PayloadAction<Partial<ProjectFormValues>>
): Generator {
  const {
    attachmentIcon,
    attachmentImages,
    attachmentBanner,
    categories,
    platforms,
    ...rest
  } = action.payload
  yield* apiWorker(
    ProjectsService.updateProject,
    {
      ...rest,
      categories: categories?.flatDropdownOptions('label'),
      platforms: platforms?.flatDropdownOptions('value') as Platform[],
    },
    {
      onSuccess: function* (response) {
        if (attachmentIcon || attachmentImages?.length || attachmentBanner) {
          yield uploadMediaWorker({
            projectId: response.data?.data?._id,
            attachmentIcon,
            attachmentBanner,
            attachmentImages: attachmentImages?.map(({ file }) => file),
          })
        }
        yield put(editProjectSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(editProjectFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* uploadMediaWorker({
  projectId,
  attachmentIcon,
  attachmentImages = [],
  attachmentBanner,
}: {
  projectId: string
} & UploadProjectMediaPayload): Generator {
  const formData = new FormData()

  if (attachmentIcon) formData.append('attachmentIcon', attachmentIcon)
  if (attachmentBanner) formData.append('attachmentBanner', attachmentBanner)
  if (attachmentImages) {
    for (const atchImg of attachmentImages) {
      formData.append('attachmentImages', atchImg)
    }
  }

  yield* uploadTask(
    `${UPLOAD_PROJECT_MEDIA_API}/${projectId}`,
    { data: formData },
    {
      onSuccess: function* (response) {
        yield put(uploadProjectMediaSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          uploadProjectMediaFailure(error?.message || 'Something went wrong')
        )
      },
    }
  )
}

function* getProjectBannersWorker(): Generator {
  yield* apiWorker(ProjectsService.getProjectBanners, undefined, {
    onSuccess: function* (response) {
      yield put(getProjectBannersSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getProjectBannersFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

function* getProjectDetailsWorker(
  action: PayloadAction<{ projectId: string }>
): Generator {
  const { projectId } = action.payload || {}
  yield* apiWorker(ProjectsService.getProjectDetails, projectId, {
    onSuccess: function* (response) {
      yield put(getProjectDetailsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getProjectDetailsFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

function* getHomeProjectsWorker(): Generator {
  yield* apiWorker(ProjectsService.getHomeProjects, undefined, {
    onSuccess: function* (response) {
      yield put(getHomeProjectsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getHomeProjectsFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

function* deleteProjectWorker(): Generator {
  const projectId = yield select(
    (state: RootState) => state.projects.projectDelete.projectId
  )
  const userId = yield select(
    (state: RootState) => state.user.profile.data?._id
  )
  yield* apiWorker(ProjectsService.deleteProject, projectId, {
    onSuccess: function* (response) {
      yield put(deleteProjectSuccess(response.data?.data))
      yield put(getProjects())
      yield put(getUserProjects({ userId }))
    },
    onFailure: function* (error) {
      yield put(deleteProjectFailure(error?.message || 'Something went wrong'))
    },
  })
}

export default function* () {
  yield all([
    takeLatest(getProjects.type, getProjectsWorker),
    takeLatest(createProject.type, createProjectWorker),
    takeLatest(editProject.type, editProjectWorker),
    takeLatest(getProjectBanners.type, getProjectBannersWorker),
    takeLatest(getProjectDetails.type, getProjectDetailsWorker),
    takeLatest(getHomeProjects.type, getHomeProjectsWorker),
    takeLatest(deleteProject.type, deleteProjectWorker),
  ])
}
