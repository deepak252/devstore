import { apiWorker } from '@/services/api'
import { all, put, takeLatest } from 'redux-saga/effects'
import ContentService from './contentService'
import {
  getMetadata,
  getMetadataFailure,
  getMetadataSuccess,
} from './contentSlice'
import { getMetadataFromStorage, saveMetadataToStorage } from '@/utils/storage'

function* getMetadataWorker(): Generator {
  const savedMetadata = getMetadataFromStorage()
  if (savedMetadata) {
    yield put(getMetadataSuccess({ data: savedMetadata }))
  }
  yield* apiWorker(ContentService.getMetadata, undefined, {
    onSuccess: function* (response) {
      saveMetadataToStorage(response.data?.data)
      yield put(getMetadataSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getMetadataFailure(error?.message || 'Something went wrong'))
    },
  })
}

export default function* () {
  yield all([takeLatest(getMetadata.type, getMetadataWorker)])
}
