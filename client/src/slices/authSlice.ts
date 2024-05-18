/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastData } from '@/components/Toast'
import { createSlice } from '@reduxjs/toolkit'

type AuthState = {
  isLoading: boolean
  isAuthenticated: boolean
  error: null | string
  isLoadingUsername: boolean
  isUsernameAvailable: boolean
  usernameError: null | string
  toastData: ToastData
}

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  isLoadingUsername: false,
  isUsernameAvailable: false,
  usernameError: null,
  toastData: { type: null, message: null },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isLoading = true
    },
    signInSuccess: (state, _) => {
      state.isAuthenticated = true
      state.error = null
      state.isLoading = false
      state.isLoadingUsername = false
      state.isUsernameAvailable = false
      state.usernameError = null
    },
    signInFailure: (state, action) => {
      state.isAuthenticated = false
      state.error = action.payload
      state.isLoading = false
      state.toastData = {
        type: 'error',
        message: action.payload,
      }
    },
    signUp: (state) => {
      state.isLoading = true
    },
    signUpSuccess: (state) => {
      state.isAuthenticated = true
      state.error = null
      state.isLoading = false
      state.isLoadingUsername = false
      state.isUsernameAvailable = false
      state.usernameError = null
    },
    signUpFailure: (state, action) => {
      state.isAuthenticated = false
      state.error = action.payload
      state.isLoading = false
      state.toastData = {
        type: 'error',
        message: action.payload,
      }
    },
    checkUsernameAvailable: (state) => {
      state.usernameError = null
      state.isLoadingUsername = true
    },
    usernameAvailableSuccess: (state) => {
      state.isLoadingUsername = false
      state.isUsernameAvailable = true
      state.usernameError = null
    },
    usernameAvailableFailure: (state, action) => {
      state.isLoadingUsername = false
      state.isUsernameAvailable = false
      state.usernameError = action.payload
    },
    setUsernameAvailable: (state, action) => {
      state.isUsernameAvailable = action.payload
    },
    signOut: (state) => {
      state.isAuthenticated = false
    },
    setToast: (state, action) => {
      state.toastData = action.payload
    },
  },
})

export const {
  signIn,
  signInSuccess,
  signInFailure,
  signUp,
  signUpSuccess,
  signUpFailure,
  checkUsernameAvailable,
  usernameAvailableSuccess,
  usernameAvailableFailure,
  setUsernameAvailable,
  signOut,
  setToast,
} = authSlice.actions

export default authSlice.reducer
