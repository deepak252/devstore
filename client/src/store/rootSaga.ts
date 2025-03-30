import { all } from 'redux-saga/effects'
import contentSaga from '../features/content/contentSaga'
import authSaga from '../features/auth/authSaga'
import userSaga from '../features/user/userSaga'
import projectsSaga from '../features/projects/projectsSaga'

export default function* rootSaga() {
  yield all([contentSaga(), authSaga(), userSaga(), projectsSaga()])
}
