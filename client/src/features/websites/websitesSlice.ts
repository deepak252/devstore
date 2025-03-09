/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebsiteListItem,
  Banner,
  Platform,
  ProjectDetails,
  ProjectList,
  ToastData,
} from '@/shared.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WebsiteFormValues } from './websites.types'

type WebsitesState = {
  data: ProjectList<WebsiteListItem>
  filter: {
    platform: Platform
    categories: string[]
  }
  websiteDetails: {
    data: ProjectDetails | null
    isLoading: boolean
  }
  websiteForm: {
    media: {
      isUploading: boolean
    }
    isOpen: boolean
    isLoading: boolean
  }
  banner: {
    list: Banner[]
    isLoading: boolean
  }
  toastData?: ToastData | null
}

const initialState: WebsitesState = {
  data: {
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    isLoading: false,
    error: null,
  },
  filter: {
    platform: 'all', // all, android, ios
    categories: [],
  },
  websiteDetails: {
    data: null,
    isLoading: false,
  },
  websiteForm: {
    // data: formDataInitialState,
    isOpen: false,
    isLoading: false,
    media: { isUploading: false },
  },
  banner: {
    list: [],
    isLoading: false,
  },
}

const websitesSlice = createSlice({
  name: 'websites',
  initialState,
  reducers: {
    // Websites List
    getWebsites: (state, action: PayloadAction<{ searchQuery?: string }>) => {
      if (action.payload.searchQuery) {
        // clear prev items on search
        state.data.list = []
      }
      state.data.isLoading = true
    },
    getWebsitesSuccess: (state, action) => {
      state.data.isLoading = false
      state.data.error = null
      state.data.list = action.payload.data?.projects
    },
    getWebsitesFailure: (state, action) => {
      state.data.isLoading = false
      state.data.error = action.payload
    },
    // Website Details
    getWebsiteDetails: (state, _: PayloadAction<{ projectId: string }>) => {
      state.websiteDetails = {
        isLoading: true,
        data: null,
      }
    },
    getWebsiteDetailsSuccess: (state, action) => {
      state.websiteDetails.isLoading = false
      state.websiteDetails.data = action.payload?.data
    },
    getWebsiteDetailsFailure: (state) => {
      state.websiteDetails.isLoading = false
    },

    toggleCreateWebsiteFormOpen: (state) => {
      state.websiteForm.isOpen = !state.websiteForm?.isOpen
    },

    // Create Website Form
    createWebsite: (state, _: PayloadAction<WebsiteFormValues>) => {
      state.websiteForm.isLoading = true
    },
    createWebsiteSuccess: (state) => {
      state.websiteForm = initialState.websiteForm
      state.toastData = {
        type: 'success',
        message: 'Your website is being processed. It will appear soon.',
      }
    },
    createWebsiteFailure: (state, action) => {
      state.websiteForm.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    createWebsiteCancelled: (state, _) => {
      state.websiteForm.isLoading = false
      console.log('createWebsiteCancelled')
    },
    // Upload Website Media
    uploadWebsiteMedia: (state, _: PayloadAction<{ icon: File }>) => {
      state.websiteForm.media.isUploading = true
    },
    uploadWebsiteMediaSuccess: (state) => {
      state.websiteForm = initialState.websiteForm
      // state.toastData = {
      //   type: 'success',
      //   message: 'Website creation submitted',
      // }
    },
    uploadWebsiteMediaFailure: (state, action) => {
      state.websiteForm.media.isUploading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Error while uploading website images',
      }
    },
    uploadWebsiteMediaCancelled: (state, _) => {
      state.websiteForm.media.isUploading = false
      console.log('uploadWebsiteMediaCancelled')
    },

    // getWebsitesBanner: (state, _) => {
    //   state.banner.isLoading = true
    // },
    // getWebsitesBannerSuccess: (state, action) => {
    //   state.banner.isLoading = false
    //   state.banner.error = null
    //   state.banner.list = action.payload?.data
    // },
    // getWebsitesBannerFailure: (state, action) => {
    //   state.banner.isLoading = false
    //   state.banner.error = action.payload
    // },
    setWebsitesFilter: (state, action) => {
      state.filter = action.payload
    },
    setWebsitesToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
  },
})

export const {
  getWebsites,
  getWebsitesSuccess,
  getWebsitesFailure,
  getWebsiteDetails,
  getWebsiteDetailsSuccess,
  getWebsiteDetailsFailure,

  createWebsite,
  createWebsiteSuccess,
  createWebsiteFailure,
  createWebsiteCancelled,

  uploadWebsiteMedia,
  uploadWebsiteMediaSuccess,
  uploadWebsiteMediaFailure,
  uploadWebsiteMediaCancelled,

  toggleCreateWebsiteFormOpen,

  // uploadWebsiteIcon,
  // uploadWebsiteIconSuccess,
  // uploadWebsiteIconFailure,
  // uploadWebsiteIconCancelled,

  // getWebsitesBanner,
  // getWebsitesBannerSuccess,
  // getWebsitesBannerFailure,
  setWebsitesFilter,
  setWebsitesToast,
} = websitesSlice.actions

export default websitesSlice.reducer
