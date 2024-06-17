import { all, call, put, takeLatest } from 'redux-saga/effects'
import { getMetadataFromStorage, saveMetadataToStorage } from '@/utils/storage'
import { METADATA_API } from '@/constants'
import { getRequest } from '@/services/api'
import {
  getMetadata,
  getMetadataFailure,
  getMetadataSuccess,
} from '@/slices/metadataSlice'

function* getMetadataHandler(): Generator<any, any, any> {
  try {
    const savedMetadata = getMetadataFromStorage()
    if (savedMetadata) {
      yield put(getMetadataSuccess({ data: savedMetadata }))
    }
    const response = yield call(getRequest, METADATA_API)
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(getMetadataSuccess(response.data))
      saveMetadataToStorage(response.data?.data)
    } else {
      throw response?.data || response
    }
  } catch (e: any) {
    console.error('getMetadataHandler', e)
    yield put(getMetadataFailure(e?.message || 'Something went wrong'))
  }
}

export default function* metadataSaga() {
  yield all([takeLatest(getMetadata.type, getMetadataHandler)])
}
