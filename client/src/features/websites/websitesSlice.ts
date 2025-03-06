/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  WebsiteListItem,
  Banner,
  ProjectFormValues,
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
    error: string | null
  }
  websiteForm: {
    data: ProjectFormValues
    icon: {
      isUploading: boolean
    }
    screenshots: {
      isUploading: boolean
    }
    isOpen: boolean
    isMinimize: boolean
    isLoading: boolean
    error: string | null
  }
  banner: {
    list: Banner[]
    isLoading: boolean
    error: string | null
  }
  toastData?: ToastData | null
}

const formDataInitialState: WebsiteFormValues = {
  name: '',
  description: '',
  categories: [],
  sourceCodeUrl: '',
  isPrivate: false,
  // platform: 'android',
  // attachmentPackage: null, // File Instance
  // attachmentIcon: null,
  // attachmentImages: [],
  // attachmentVideo: null,
  // attachmentGraphic: null,
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
    error: null,
  },
  websiteForm: {
    data: formDataInitialState,
    isOpen: false,
    isMinimize: false,
    isLoading: false,
    error: null,
    icon: { isUploading: false },
    screenshots: { isUploading: false },
  },
  banner: {
    list: [],
    isLoading: false,
    error: null,
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
        error: null,
        data: null,
      }
    },
    getWebsiteDetailsSuccess: (state, action) => {
      state.websiteDetails.isLoading = false
      state.websiteDetails.error = null
      state.websiteDetails.data = action.payload?.data
    },
    getWebsiteDetailsFailure: (state, action) => {
      state.websiteDetails.isLoading = false
      state.websiteDetails.error = action.payload
    },
    // Create Website Form
    toggleCreateWebsiteFormOpen: (state) => {
      state.websiteForm.isOpen = !state.websiteForm?.isOpen
      if (!state.websiteForm.isOpen) {
        // Form Closed
        state.websiteForm.isMinimize = false
        state.websiteForm.data = formDataInitialState
      }
    },
    toggleCreateWebsiteFormMinimize: (state) => {
      state.websiteForm.isMinimize = !state.websiteForm?.isMinimize
    },
    setCreateWebsiteFormData: (
      state,
      action: PayloadAction<WebsiteFormValues>
    ) => {
      state.websiteForm.data = action.payload
    },
    createWebsite: (state, _: PayloadAction<FormData>) => {
      state.websiteForm.isLoading = true
      state.websiteForm.error = null
    },
    createWebsiteSuccess: (state) => {
      state.websiteForm = initialState.websiteForm
      state.toastData = {
        type: 'success',
        message: 'Website added successfully!',
      }
    },
    createWebsiteFailure: (state, action) => {
      state.websiteForm.isLoading = false
      state.websiteForm.error = action.payload
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    createWebsiteCancelled: (state, _) => {
      state.websiteForm.isLoading = false
      state.websiteForm.error = null
      console.log('createWebsiteCancelled')
    },

    uploadWebsiteIcon: (state, _: PayloadAction<{ icon: File }>) => {
      state.websiteForm.icon.isUploading = true
    },
    uploadWebsiteIconSuccess: (state) => {
      state.websiteForm = initialState.websiteForm
    },
    uploadWebsiteIconFailure: (state, action) => {
      state.websiteForm.icon.isUploading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    uploadWebsiteIconCancelled: (state, _) => {
      state.websiteForm.icon.isUploading = false
      console.log('uploadWebsiteIconCancelled')
    },

    getWebsitesBanner: (state, _) => {
      state.banner.isLoading = true
    },
    getWebsitesBannerSuccess: (state, action) => {
      state.banner.isLoading = false
      state.banner.error = null
      state.banner.list = action.payload?.data
    },
    getWebsitesBannerFailure: (state, action) => {
      state.banner.isLoading = false
      state.banner.error = action.payload
    },
    setWebsitesFilter: (state, action) => {
      state.filter = action.payload
    },
    setWebsitesToast: (state, action) => {
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
  toggleCreateWebsiteFormOpen,
  toggleCreateWebsiteFormMinimize,
  setCreateWebsiteFormData,
  createWebsite,
  createWebsiteSuccess,
  createWebsiteFailure,
  createWebsiteCancelled,

  uploadWebsiteIcon,
  uploadWebsiteIconSuccess,
  uploadWebsiteIconFailure,
  uploadWebsiteIconCancelled,

  getWebsitesBanner,
  getWebsitesBannerSuccess,
  getWebsitesBannerFailure,
  setWebsitesFilter,
  setWebsitesToast,
} = websitesSlice.actions

export default websitesSlice.reducer
