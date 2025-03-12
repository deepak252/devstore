import { apiWorker } from '@/services/api'
import { all, put, takeLatest } from 'redux-saga/effects'
import ContentService from './contentService'
import {
  getMetadata,
  getMetadataFailure,
  getMetadataSuccess,
} from './contentSlice'

function* getMetadataWorker(): Generator {
  yield* apiWorker(ContentService.getMetadata, undefined, {
    onSuccess: function* (response) {
      yield put(getMetadataSuccess(response.data))
    },
    onFailure: function* (error) {
      yield put(getMetadataFailure(error?.message || 'Something went wrong'))
    },
  })
}

export default function* () {
  yield all([takeLatest(getMetadata.type, getMetadataWorker)])
}
