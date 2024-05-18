import { all, call, put, takeLatest } from 'redux-saga/effects'
import { postRequest } from '@/services/api'
import { saveAccessTokenToStorage, saveUserToStorage } from '@/utils/storage'
import { SIGN_IN_API, SIGN_UP_API, USER_API } from '@/constants'
import {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  usernameAvailableSuccess,
  usernameAvailableFailure,
  checkUsernameAvailable,
} from '@/slices/authSlice'

function* signInHandler(action: any): Generator<any, any, any> {
  try {
    const { usernameOrEmail, password } = action.payload
    const response = yield call(postRequest, SIGN_IN_API, {
      data: { usernameOrEmail, password },
    })
    if (response && response.status >= 200 && response.status <= 299) {
      saveAccessTokenToStorage(response.data?.data?.token)
      saveUserToStorage(response.data?.data?.user)
      yield put(signInSuccess(response.data))
    } else {
      throw response?.data || response
    }
  } catch (e: any) {
    console.error('signInHandler', e)
    yield put(signInFailure(e?.message || 'Something went wrong'))
  }
}

function* signUpHandler(action: any): Generator<any, any, any> {
  try {
    const { username, email, password } = action.payload
    const response = yield call(postRequest, SIGN_UP_API, {
      data: { email, password, username },
    })
    if (response && response.status >= 200 && response.status <= 299) {
      saveAccessTokenToStorage(response.data?.data?.token)
      saveUserToStorage(response.data?.data?.user)
      yield put(signUpSuccess(response.data))
    } else {
      throw response?.data || response
    }
  } catch (e: any) {
    console.error('signUpHandler', e)
    yield put(signUpFailure(e?.message || 'Something went wrong'))
  }
}

function* checkUsernameAvailableHandler(action: any): Generator<any, any, any> {
  try {
    const username = action.payload
    if (!username) {
      throw new Error('Username is required')
    }
    const response = yield call(postRequest, USER_API + '/usernameAvailable', {
      data: { username },
    })
    if (response && response.status >= 200 && response.status <= 299) {
      yield put(usernameAvailableSuccess(response.data))
    } else {
      throw response?.data || response
    }
  } catch (e: any) {
    console.error('checkUsernameAvailableHandler', e)
    yield put(usernameAvailableFailure(e?.message || 'Something went wrong'))
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(signIn.type, signInHandler),
    takeLatest(signUp.type, signUpHandler),
    takeLatest(checkUsernameAvailable, checkUsernameAvailableHandler),
  ])
}
