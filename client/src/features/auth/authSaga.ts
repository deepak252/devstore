import { all, put, takeLatest } from 'redux-saga/effects'
import {
  checkUsername,
  checkUsernameFailure,
  checkUsernameSuccess,
  sendEmailVerification,
  sendEmailVerificationFailure,
  sendEmailVerificationSuccess,
  signIn,
  signInFailure,
  signInSuccess,
  signOut,
  signOutFailure,
  signOutSuccess,
  signUp,
  signUpFailure,
  verifyEmail,
  verifyEmailFailure,
  verifyEmailSuccess,
} from './authSlice'
import AuthService from './authService'
import { PayloadAction } from '@reduxjs/toolkit'
import { SignInFormValues, SignUpFormValues } from './auth.types'
import { apiWorker } from '@/services/api'
import {
  removeUserFromStorage,
  saveAccessToken,
  saveUserToStorage,
} from '@/utils/storage'

function* signInWorker(action: PayloadAction<SignInFormValues>): Generator {
  const { usernameOrEmail, password } = action.payload
  yield* apiWorker(
    AuthService.signIn,
    { usernameOrEmail, password },
    {
      onSuccess: function* (response) {
        // saveUserToStorage(response.data?.data?.user)
        if (response.data?.data?.accessToken) {
          saveAccessToken(response.data?.data?.accessToken)
          saveUserToStorage(response.data?.data?.user)
          yield put(signInSuccess(response.data))
        } else {
          saveUserToStorage(response.data?.data) // {email}
          yield put(sendEmailVerificationSuccess())
        }
      },
      onFailure: function* (error) {
        yield put(signInFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* signUpWorker(action: PayloadAction<SignUpFormValues>): Generator {
  const { username, email, password } = action.payload
  yield* apiWorker(
    AuthService.signUp,
    { username, email, password },
    {
      onSuccess: function* (response) {
        saveUserToStorage(response.data?.data) // {email}
        yield put(sendEmailVerificationSuccess())
        // saveAccessToken(response.data?.data?.accessToken)
        // yield put(signUpSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(signUpFailure(error?.message || 'Something went wrong'))
      },
    }
  )
}

function* sigOutWorker(): Generator {
  yield* apiWorker(AuthService.signOut, undefined, {
    onSuccess: function* (response) {
      removeUserFromStorage()
      yield put(signOutSuccess(response.data))
    },
    onFailure: function* (error) {
      removeUserFromStorage()
      yield put(signOutFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* checkUsernameWorker(
  action: PayloadAction<{ username: string }>
): Generator {
  const { username } = action.payload
  yield* apiWorker(
    AuthService.checkUsername,
    { username },
    {
      onSuccess: function* (response) {
        yield put(checkUsernameSuccess(response.data))
      },
      onFailure: function* (error) {
        yield put(
          checkUsernameFailure(error?.message || 'Something went wrong')
        )
      },
    }
  )
}

function* verifyEmailWorker(
  action: PayloadAction<{ token: string }>
): Generator {
  yield* apiWorker(AuthService.verifyEmail, action.payload.token, {
    onSuccess: function* (response) {
      saveAccessToken(response.data?.data?.accessToken)
      saveUserToStorage(response.data?.data?.user)
      yield put(verifyEmailSuccess(response.data))
    },
    onFailure: function* (error) {
      yield put(verifyEmailFailure(error?.message || 'Something went wrong'))
    },
  })
}

function* sendEmailVerificationWorker(
  action: PayloadAction<{ email: string }>
): Generator {
  yield* apiWorker(AuthService.sendEmailVerification, action.payload, {
    onSuccess: function* (response) {
      saveUserToStorage(response.data?.data) // {email}
      yield put(sendEmailVerificationSuccess(response.data))
    },
    onFailure: function* (error) {
      yield put(
        sendEmailVerificationFailure(error?.message || 'Something went wrong')
      )
    },
  })
}

export default function* () {
  yield all([
    takeLatest(signIn.type, signInWorker),
    takeLatest(signUp.type, signUpWorker),
    takeLatest(signOut.type, sigOutWorker),
    takeLatest(checkUsername.type, checkUsernameWorker),
    takeLatest(verifyEmail.type, verifyEmailWorker),
    takeLatest(sendEmailVerification.type, sendEmailVerificationWorker),
  ])
}
