import { all, put, takeLatest } from 'redux-saga/effects'
import { apiWorker } from '@/services/api'
import { getUserFromStorage, saveUserToStorage } from '@/utils/storage'
import UserService from './userService'
import {
  getProfile,
  getProfileFailure,
  getProfileSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess,
} from './userSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { User } from './user.types'

function* getProfileWorker(): Generator {
  const user = getUserFromStorage()
  if (user) {
    yield put(getProfileSuccess(user))
  }
  yield* apiWorker(UserService.getUserProfile, undefined, {
    onSuccess: function* (response) {
      saveUserToStorage(response.data?.data)
      yield put(getProfileSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(getProfileFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* updateProfileWorker(action: PayloadAction<Partial<User>>): Generator {
  const data = action.payload
  yield* apiWorker(UserService.updateUserProfile, data, {
    onSuccess: function* (response) {
      saveUserToStorage(response.data?.data)
      yield put(updateProfileSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(updateProfileFailure(error?.message || 'Something went wrong'))
    },
  })
}

export default function* () {
  yield all([
    takeLatest(getProfile.type, getProfileWorker),
    takeLatest(updateProfile.type, updateProfileWorker),
  ])
}
