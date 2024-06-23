import { all } from 'redux-saga/effects'
import authSaga from './authSaga'
import metadataSaga from './metadataSaga'
import userSaga from './userSaga'

export default function* rootSaga() {
  yield all([authSaga(), metadataSaga(), userSaga()])
}
