/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signOutSuccess } from '../auth/authSlice'
import { User } from './user.types'
import { ToastData } from '@/shared.types'

type UserState = {
  profile: {
    data?: User
    isLoading?: boolean
  }
  toastData?: ToastData | null
}

const initialState: UserState = {
  profile: {
    isLoading: false,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProfile: (state) => {
      state.profile.isLoading = true
    },
    getProfileSuccess: (state, action: PayloadAction<User>) => {
      state.profile.isLoading = false
      state.profile.data = action.payload
    },
    getProfileFailure: (state, action) => {
      state.profile.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    setUserToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
    resetUserState: (state) => {
      return {
        ...initialState,
        toastData: state.toastData,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // .addCase(signInSuccess, (state, action) => {
      //   state.profile.data = action.payload?.data
      // })
      // .addCase(signUpSuccess, (state, action) => {
      //   state.profile.data = action.payload?.data
      // })
      .addCase(signOutSuccess, () => initialState)
  },
})

export const {
  getProfile,
  getProfileSuccess,
  getProfileFailure,

  setUserToast,
  resetUserState,
} = userSlice.actions

export default userSlice.reducer
