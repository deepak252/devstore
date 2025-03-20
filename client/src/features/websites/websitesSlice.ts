import {
  WebsiteListItem,
  Banner,
  Platform,
  ProjectDetails,
  ToastData,
  PaginatedList,
} from '@/shared.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { WebsiteFormValues } from './websites.types'

type WebsitesState = {
  data: PaginatedList<WebsiteListItem>
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
    totalResults: 0,
    isLoading: false,
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
      const { projects = [], metadata = {} } = action.payload || {}
      state.data.isLoading = false
      state.data.list = projects
      state.data.page = metadata.currentPage
      state.data.limit = metadata.itemsPerPage
      state.data.totalPages = metadata.totalPages
      state.data.totalResults = metadata.totalItems
    },
    getWebsitesFailure: (state, action) => {
      state.data.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    // Website Details
    getWebsiteDetails: (
      state,
      action: PayloadAction<{ projectId: string }>
    ) => {
      if (action.payload.projectId !== state.websiteDetails.data?._id) {
        state.websiteDetails = {
          isLoading: true,
          data: null,
        }
      }
    },
    getWebsiteDetailsSuccess: (state, action) => {
      state.websiteDetails = {
        isLoading: false,
        data: action.payload,
      }
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

    getWebsiteBanners: (state, _) => {
      state.banner.isLoading = true
    },
    getWebsiteBannersSuccess: (state, action) => {
      state.banner.isLoading = false
      state.banner.list = action.payload
    },
    getWebsiteBannersFailure: (state, action) => {
      state.banner.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },

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

  getWebsiteBanners,
  getWebsiteBannersSuccess,
  getWebsiteBannersFailure,

  setWebsitesFilter,
  setWebsitesToast,
} = websitesSlice.actions

export default websitesSlice.reducer
