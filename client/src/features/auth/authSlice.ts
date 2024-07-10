/* eslint-disable @typescript-eslint/no-unused-vars */
import { ToastData } from '@/components/Toast'
import { SignInPayload, SignUpPayload } from '@/types/auth.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthState = {
  isLoading: boolean
  isSignedIn: boolean
  isSignedOut: boolean
  error: null | string
  username: {
    isLoading: boolean
    isAvailable: boolean
    error: null | string
  }
  toastData: ToastData
}

const initialState: AuthState = {
  isLoading: false,
  isSignedIn: false,
  isSignedOut: false,
  error: null,
  username: {
    isLoading: false,
    isAvailable: false,
    error: null,
  },
  toastData: { type: null, message: null },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign In
    signIn: (state, _: PayloadAction<SignInPayload>) => {
      state.isLoading = true
    },
    signInSuccess: (state, _) => {
      state.isSignedIn = true
      state.error = null
      state.isLoading = false
    },
    signInFailure: (state, action) => {
      state.isSignedIn = false
      state.error = action.payload
      state.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },
    // Sign Up
    signUp: (state, _: PayloadAction<SignUpPayload>) => {
      state.isLoading = true
    },
    signUpSuccess: (state, _) => {
      state.isSignedIn = true
      state.error = null
      state.isLoading = false
      state.username = {
        isLoading: false,
        isAvailable: false,
        error: null,
      }
    },
    signUpFailure: (state, action) => {
      state.isSignedIn = false
      state.error = action.payload
      state.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },
    // Check Username Available
    checkUsernameAvailable: (state, _: PayloadAction<{ username: string }>) => {
      state.username = {
        isLoading: true,
        isAvailable: false,
        error: null,
      }
    },
    usernameAvailableSuccess: (state) => {
      state.username = {
        isLoading: false,
        isAvailable: true,
        error: null,
      }
    },
    usernameAvailableFailure: (state, action) => {
      state.username = {
        isLoading: false,
        isAvailable: false,
        error: action.payload,
      }
    },
    setUsernameAvailable: (state, action) => {
      state.username.isAvailable = action.payload
    },
    // Sign Out
    signOut: (state) => {
      state.isSignedIn = false
    },
    signOutSuccess: (state) => {
      state.isSignedOut = true
    },

    setAuthToastData: (state, action) => {
      state.toastData = action.payload
    },
    resetAuthState: (state) => {
      return {
        ...initialState,
        toastData: state.toastData,
      }
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
  signOutSuccess,
  setAuthToastData,
  resetAuthState,
} = authSlice.actions

export default authSlice.reducer
