import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signOutSuccess } from '../auth/authSlice'
import { User } from './user.types'
import { ToastData } from '@/shared.types'

type UserState = {
  profile: {
    data?: User
    isLoading?: boolean
    isUpdating?: boolean
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

    updateProfile: (state, _: PayloadAction<Partial<User>>) => {
      state.profile.isUpdating = true
    },
    updateProfileSuccess: (state, action: PayloadAction<User>) => {
      state.profile.isUpdating = false
      state.profile.data = action.payload
      state.toastData = {
        type: 'success',
        message: 'Profile updated successfully',
      }
    },
    updateProfileFailure: (state, action) => {
      state.profile.isUpdating = false
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

  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,

  setUserToast,
  resetUserState,
} = userSlice.actions

export default userSlice.reducer
