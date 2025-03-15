import { all } from 'redux-saga/effects'
import contentSaga from '../features/content/contentSaga'
import authSaga from '../features/auth/authSaga'
import metadataSaga from '../features/metadata/metadataSaga'
import userSaga from '../features/user/userSaga'
import websitesSaga from '../features/websites/websitesSaga'

export default function* rootSaga() {
  yield all([
    contentSaga(),
    authSaga(),
    metadataSaga(),
    userSaga(),
    websitesSaga(),
  ])
}
