import { all, call, put, takeLatest } from 'redux-saga/effects'
import {
  getUserProfile,
  getUserProfileFailure,
  getUserProfileSuccess,
} from '@/slices/userSlice'
import { getRequest } from '@/services/api'
import { USER_API } from '@/constants'
import { getUserFromStorage, saveUserToStorage } from '@/utils/storage'

// Fetch Logged In user using authToken
function* getUserProfileHandler(): Generator<any, any, any> {
  try {
    const cachedUser = getUserFromStorage()
    if (cachedUser) {
      yield put(getUserProfileSuccess({ data: cachedUser }))
    }
    const response = yield call(getRequest, USER_API)
    if (response && response.status >= 200 && response.status <= 299) {
      saveUserToStorage(response.data?.data)
      yield put(getUserProfileSuccess(response.data))
    } else {
      throw response?.data || response
    }
  } catch (e: any) {
    console.error('getUserHandler', e)
    yield put(getUserProfileFailure(e?.message || 'Something went wrong'))
  }
}

// function* getUserProfileHandler(action: any): Generator<any, any, any> {
//   try {
//     const { username } = action.payload
//     const response = yield call(getRequest, USER_API + `/${username}`)
//     if (response && response.status >= 200 && response.status <= 299) {
//       yield put(getUserProfileSuccess(response.data))
//     } else {
//       throw response?.data || response
//     }
//   } catch (e: any) {
//     console.error('getUserProfileHandler', e)
//     yield put(getUserProfileFailure(e?.message || 'Something went wrong'))
//   }
// }

export default function* userSaga() {
  yield all([
    // takeLatest(getUser.type, getUserHandler),
    takeLatest(getUserProfile.type, getUserProfileHandler),
  ])
}
