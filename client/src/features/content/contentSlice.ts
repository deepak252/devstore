/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ToastData } from '@/shared.types'
import { Metadata } from './content.types'

type ContentState = {
  metadata: {
    data?: Metadata
    isLoading?: boolean
  }
  toastData?: ToastData | null
}

const initialState: ContentState = {
  metadata: {
    isLoading: false,
  },
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    getMetadata: (state) => {
      state.metadata.isLoading = true
    },
    getMetadataSuccess: (state, action: PayloadAction<any>) => {
      state.metadata.isLoading = false
      state.metadata.data = action.payload
    },
    getMetadataFailure: (state, action) => {
      state.metadata.isLoading = false
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
})

export const {
  getMetadata,
  getMetadataSuccess,
  getMetadataFailure,

  setUserToast,
  resetUserState,
} = contentSlice.actions

export default contentSlice.reducer
