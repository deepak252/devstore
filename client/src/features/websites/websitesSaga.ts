import { all, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { apiWorker, uploadTask } from '@/services/api'
import { UPLOAD_PROJECT_MEDIA_API } from '@/constants'
import {
  createWebsite,
  createWebsiteFailure,
  createWebsiteSuccess,
  getWebsiteBanners,
  getWebsiteBannersFailure,
  getWebsiteBannersSuccess,
  getWebsiteDetails,
  getWebsiteDetailsFailure,
  getWebsiteDetailsSuccess,
  getWebsites,
  getWebsitesFailure,
  getWebsitesSuccess,
  uploadWebsiteMediaFailure,
  uploadWebsiteMediaSuccess,
} from './websitesSlice'
import { WebsiteFormValues } from './websites.types'
import WebsitesService from './websitesService'
import { UploadProjectMediaPayload } from '@/shared.types'

function* getWebsitesWorker(): Generator {
  yield* apiWorker(WebsitesService.getWebsites, undefined, {
    onSuccess: function* (response) {
      yield put(getWebsitesSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getWebsitesFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* createWebsiteWorker(
  action: PayloadAction<WebsiteFormValues>
): Generator {
  const {
    attachmentIcon,
    attachmentImages,
    attachmentBanner,
    categories,
    ...rest
  } = action.payload
  yield* apiWorker(
    WebsitesService.createWebsite,
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
        yield put(createWebsiteSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          createWebsiteFailure(error?.message || 'Something went wrong')
        )
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
        yield put(uploadWebsiteMediaSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          uploadWebsiteMediaFailure(error?.message || 'Something went wrong')
        )
      },
    }
  )
}

function* getWebsiteBannersWorker(): Generator {
  yield* apiWorker(WebsitesService.getWebsiteBanners, undefined, {
    onSuccess: function* (response) {
      yield put(getWebsiteBannersSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getWebsiteBannersFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

function* getWebsiteDetailsWorker(
  action: PayloadAction<{ projectId: string }>
): Generator {
  const { projectId } = action.payload || {}
  yield* apiWorker(WebsitesService.getWebsiteDetails, projectId, {
    onSuccess: function* (response) {
      yield put(getWebsiteDetailsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getWebsiteDetailsFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

export default function* () {
  yield all([
    takeLatest(getWebsites.type, getWebsitesWorker),
    takeLatest(createWebsite.type, createWebsiteWorker),
    takeLatest(getWebsiteBanners.type, getWebsiteBannersWorker),
    takeLatest(getWebsiteDetails.type, getWebsiteDetailsWorker),
    // takeLatest(uploadWebsiteIcon.type, uploadWebsiteIconWorker),
  ])
}
