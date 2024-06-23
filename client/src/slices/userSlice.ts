/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOAST_INITIAL_DATA, ToastData } from '@/components/Toast'
import { createSlice } from '@reduxjs/toolkit'
import { signInSuccess, signUpSuccess } from './authSlice'

type UserState = {
  profile: {
    data: Record<string, any> | null
    isLoading: boolean
    error: string | null
  }
  toastData: ToastData
}

const initialState: UserState = {
  profile: {
    data: null,
    isLoading: false,
    error: null,
  },
  toastData: TOAST_INITIAL_DATA,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserProfile: (state) => {
      state.profile.isLoading = true
    },
    getUserProfileSuccess: (state, action) => {
      state.profile = {
        data: action.payload?.data,
        isLoading: false,
        error: null,
      }
    },
    getUserProfileFailure: (state, action) => {
      state.profile.error = action.payload
      state.profile.isLoading = false
    },
    // deleteUser: (state) => {
    //   state.user = null
    // },
    // getUserProfile: (state, _: PayloadAction<{ username: string }>) => {
    //   state.isLoadingUserProfile = true
    // },
    // getUserProfileSuccess: (state, action) => {
    //   state.userProfileError = null
    //   state.isLoadingUserProfile = false
    //   state.userProfile = action.payload?.data
    // },
    // getUserProfileFailure: (state, action) => {
    //   state.userProfileError = action.payload
    //   state.isLoadingUserProfile = false
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInSuccess, (state, action) => {
        state.profile.data = action.payload?.data
      })
      .addCase(signUpSuccess, (state, action) => {
        state.profile.data = action.payload?.data
      })
  },
})

export const { getUserProfile, getUserProfileSuccess, getUserProfileFailure } =
  userSlice.actions

export default userSlice.reducer
