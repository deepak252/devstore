import { all, put, takeLatest } from 'redux-saga/effects'
import { apiWorker, uploadTask } from '@/services/api'
import { getUserFromStorage, saveUserToStorage } from '@/utils/storage'
import UserService from './userService'
import {
  getOtherProfile,
  getOtherProfileFailure,
  getOtherProfileSuccess,
  getProfile,
  getProfileFailure,
  getProfileSuccess,
  getUserProjects,
  getUserProjectsFailure,
  getUserProjectsSuccess,
  updateProfile,
  updateProfileFailure,
  updateProfileSuccess,
} from './userSlice'
import { PayloadAction } from '@reduxjs/toolkit'
import { GeneralFormValues, User } from './user.types'
import { UPLOAD_PROFILE_IMAGE_API } from '@/constants'

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

function* updateProfileWorker(
  action: PayloadAction<Partial<User & GeneralFormValues>>
): Generator {
  const { attachmentProfileImage, ...data } = action.payload
  yield* apiWorker(UserService.updateUserProfile, data, {
    onSuccess: function* (response) {
      if (attachmentProfileImage) {
        const res = yield uploadProfileImageWorker({
          attachmentProfileImage,
        })
        console.log(res)
      }
      saveUserToStorage(response.data?.data)
      yield put(updateProfileSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(updateProfileFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* uploadProfileImageWorker({
  attachmentProfileImage,
}: {
  attachmentProfileImage: File
}): Generator {
  if (!attachmentProfileImage) return
  const formData = new FormData()

  if (attachmentProfileImage) {
    formData.append('attachmentProfileImage', attachmentProfileImage)
  }

  yield* uploadTask(
    UPLOAD_PROFILE_IMAGE_API,
    { data: formData },
    {
      onSuccess: function* (response) {
        console.log(response)
        yield response
      },
      onFailure: function* (error) {
        yield error
      },
    }
  )
}

function* getUserProjectsWorker(
  action: PayloadAction<{ userId: string }>
): Generator {
  yield* apiWorker(UserService.getUserProjects, action.payload.userId, {
    onSuccess: function* (response) {
      yield put(getUserProjectsSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getUserProjectsFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

function* getOtherProfileWorker(
  action: PayloadAction<{ username: string }>
): Generator {
  yield* apiWorker(UserService.getUserProfile, action.payload.username, {
    onSuccess: function* (response) {
      yield put(getOtherProfileSuccess(response.data?.data))
    },
    onFailure: function* (error) {
      yield put(
        getOtherProfileFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

export default function* () {
  yield all([
    takeLatest(getProfile.type, getProfileWorker),
    takeLatest(updateProfile.type, updateProfileWorker),
    takeLatest(getUserProjects.type, getUserProjectsWorker),
    takeLatest(getOtherProfile.type, getOtherProfileWorker),
  ])
}
