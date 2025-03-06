import { all, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'
import { uploadTask } from '@/services/api'
import { MEDIA_UPLOAD_API } from '@/constants'
import {
  uploadWebsiteIcon,
  uploadWebsiteIconFailure,
  uploadWebsiteIconSuccess,
} from './websitesSlice'

function* uploadWebsiteIconWorker(
  action: PayloadAction<{ icon: File }>
): Generator {
  const formData = new FormData()
  formData.append('file', action.payload.icon)
  console.log(formData, action.payload.icon)

  yield* uploadTask(
    MEDIA_UPLOAD_API,
    { data: formData },
    {
      onSuccess: function* (response) {
        yield put(uploadWebsiteIconSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          uploadWebsiteIconFailure(error?.message || 'Something went wrong')
        )
      },
    }
  )
}

export default function* () {
  yield all([takeLatest(uploadWebsiteIcon.type, uploadWebsiteIconWorker)])
}
