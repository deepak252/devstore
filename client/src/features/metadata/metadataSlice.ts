import { createSlice } from '@reduxjs/toolkit'

type MetadataState = {
  data: null | Record<string, any>
  isLoading: boolean
  error: null | string
}

const initialState: MetadataState = {
  data: null,
  isLoading: false,
  error: null,
}

const metadataSlice = createSlice({
  name: 'metadata',
  initialState,
  reducers: {
    getMetadata: (state) => {
      state.isLoading = true
    },
    getMetadataSuccess: (state, action) => {
      state.error = null
      state.isLoading = false
      state.data = action.payload?.data
    },
    getMetadataFailure: (state, action) => {
      state.error = action.payload
      state.isLoading = false
    },
  },
})

export const { getMetadata, getMetadataSuccess, getMetadataFailure } =
  metadataSlice.actions

export default metadataSlice.reducer
