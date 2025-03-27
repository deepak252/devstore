import { all, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { apiWorker, uploadTask } from '@/services/api'
import { UPLOAD_PROJECT_MEDIA_API } from '@/constants'
import {
  createApp,
  createAppFailure,
  createAppSuccess,
  getAppBanners,
  getAppBannersFailure,
  getAppBannersSuccess,
  getAppDetails,
  getAppDetailsFailure,
  getAppDetailsSuccess,
  getApps,
  getAppsFailure,
  getAppsSuccess,
  getHomeApps,
  getHomeAppsFailure,
  getHomeAppsSuccess,
  uploadAppMediaFailure,
  uploadAppMediaSuccess,
} from './appsSlice'
import { AppFormValues } from './apps.types'
import AppsService from './appsService'
import { UploadProjectMediaPayload } from '@/shared.types'

function* getAppsWorker(): Generator {
  yield* apiWorker(AppsService.getApps, undefined, {
    onSuccess: function* (response) {
      yield put(getAppsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getAppsFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* createAppWorker(action: PayloadAction<AppFormValues>): Generator {
  const {
    attachmentIcon,
    attachmentImages,
    attachmentBanner,
    categories,
    ...rest
  } = action.payload
  yield* apiWorker(
    AppsService.createApp,
    {
      ...rest,
      categories: categories?.flatDropdownOptions('label'),
    },
    {
      onSuccess: function* (response) {
        if (attachmentIcon || attachmentImages?.length || attachmentBanner) {
          yield uploadMediaWorker({
            projectId: response.data?.data?._id,
            attachmentIcon,
            attachmentImages: attachmentImages?.map(({ file }) => file),
            attachmentBanner,
          })
        }
        yield put(createAppSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(createAppFailure(error?.message || 'Something went wrong'))
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
  for (const atchImg of attachmentImages) {
    formData.append('attachmentImages', atchImg)
  }

  yield* uploadTask(
    `${UPLOAD_PROJECT_MEDIA_API}/${projectId}`,
    { data: formData },
    {
      onSuccess: function* (response) {
        yield put(uploadAppMediaSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          uploadAppMediaFailure(error?.message || 'Something went wrong')
        )
      },
    }
  )
}

function* getAppBannersWorker(): Generator {
  yield* apiWorker(AppsService.getAppBanners, undefined, {
    onSuccess: function* (response) {
      yield put(getAppBannersSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getAppBannersFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* getAppDetailsWorker(
  action: PayloadAction<{ projectId: string }>
): Generator {
  const { projectId } = action.payload || {}
  yield* apiWorker(AppsService.getAppDetails, projectId, {
    onSuccess: function* (response) {
      yield put(getAppDetailsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getAppDetailsFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* getHomeAppsWorker(): Generator {
  yield* apiWorker(AppsService.getHomeApps, undefined, {
    onSuccess: function* (response) {
      yield put(getHomeAppsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getHomeAppsFailure(error?.message || 'Something went wrong'))
    },
  })
}

export default function* () {
  yield all([
    takeLatest(getApps.type, getAppsWorker),
    takeLatest(createApp.type, createAppWorker),
    takeLatest(getAppBanners.type, getAppBannersWorker),
    takeLatest(getAppDetails.type, getAppDetailsWorker),
    takeLatest(getHomeApps.type, getHomeAppsWorker),
    // takeLatest(uploadAppIcon.type, uploadAppIconWorker),
  ])
}
