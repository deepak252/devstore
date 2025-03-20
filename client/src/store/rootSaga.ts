import { all } from 'redux-saga/effects'
import contentSaga from '../features/content/contentSaga'
import authSaga from '../features/auth/authSaga'
import userSaga from '../features/user/userSaga'
import websitesSaga from '../features/websites/websitesSaga'
import appsSaga from '../features/apps/appsSaga'

export default function* rootSaga() {
  yield all([contentSaga(), authSaga(), userSaga(), websitesSaga(), appsSaga()])
}
