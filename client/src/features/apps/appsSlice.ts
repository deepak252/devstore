import {
  AppListItem,
  Banner,
  Platform,
  ProjectDetails,
  ToastData,
  PaginatedList,
} from '@/shared.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppFormValues } from './apps.types'

type AppsState = {
  data: PaginatedList<AppListItem>
  filter: {
    platform: Platform
    categories: string[]
  }
  appDetails: {
    data: ProjectDetails | null
    isLoading: boolean
  }
  appForm: {
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

const initialState: AppsState = {
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
  appDetails: {
    data: null,
    isLoading: false,
  },
  appForm: {
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

const appsSlice = createSlice({
  name: 'apps',
  initialState,
  reducers: {
    // Apps List
    getApps: (state, action: PayloadAction<{ searchQuery?: string }>) => {
      if (action.payload.searchQuery) {
        // clear prev items on search
        state.data.list = []
      }
      state.data.isLoading = true
    },
    getAppsSuccess: (state, action) => {
      const { projects = [], metadata = {} } = action.payload || {}
      state.data.isLoading = false
      state.data.list = projects
      state.data.page = metadata.currentPage
      state.data.limit = metadata.itemsPerPage
      state.data.totalPages = metadata.totalPages
      state.data.totalResults = metadata.totalItems
    },
    getAppsFailure: (state, action) => {
      state.data.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    // App Details
    getAppDetails: (state, action: PayloadAction<{ projectId: string }>) => {
      if (action.payload.projectId !== state.appDetails.data?._id) {
        state.appDetails = {
          isLoading: true,
          data: null,
        }
      }
    },
    getAppDetailsSuccess: (state, action) => {
      state.appDetails = {
        isLoading: false,
        data: action.payload,
      }
    },
    getAppDetailsFailure: (state) => {
      state.appDetails.isLoading = false
    },

    toggleCreateAppFormOpen: (state) => {
      state.appForm.isOpen = !state.appForm?.isOpen
    },

    // Create App Form
    createApp: (state, _: PayloadAction<AppFormValues>) => {
      state.appForm.isLoading = true
    },
    createAppSuccess: (state) => {
      state.appForm = initialState.appForm
      state.toastData = {
        type: 'success',
        message: 'Your app is being processed. It will appear soon.',
      }
    },
    createAppFailure: (state, action) => {
      state.appForm.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    createAppCancelled: (state, _) => {
      state.appForm.isLoading = false
      console.log('createAppCancelled')
    },
    // Upload App Media
    uploadAppMedia: (state, _: PayloadAction<{ icon: File }>) => {
      state.appForm.media.isUploading = true
    },
    uploadAppMediaSuccess: (state) => {
      state.appForm = initialState.appForm
      // state.toastData = {
      //   type: 'success',
      //   message: 'App creation submitted',
      // }
    },
    uploadAppMediaFailure: (state, action) => {
      state.appForm.media.isUploading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Error while uploading app images',
      }
    },
    uploadAppMediaCancelled: (state, _) => {
      state.appForm.media.isUploading = false
      console.log('uploadAppMediaCancelled')
    },

    getAppBanners: (state, _) => {
      state.banner.isLoading = true
    },
    getAppBannersSuccess: (state, action) => {
      state.banner.isLoading = false
      state.banner.list = action.payload
    },
    getAppBannersFailure: (state, action) => {
      state.banner.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },

    setAppsFilter: (state, action) => {
      state.filter = action.payload
    },
    setAppsToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
  },
})

export const {
  getApps,
  getAppsSuccess,
  getAppsFailure,

  getAppDetails,
  getAppDetailsSuccess,
  getAppDetailsFailure,

  createApp,
  createAppSuccess,
  createAppFailure,
  createAppCancelled,

  uploadAppMedia,
  uploadAppMediaSuccess,
  uploadAppMediaFailure,
  uploadAppMediaCancelled,

  toggleCreateAppFormOpen,

  // uploadAppIcon,
  // uploadAppIconSuccess,
  // uploadAppIconFailure,
  // uploadAppIconCancelled,

  getAppBanners,
  getAppBannersSuccess,
  getAppBannersFailure,

  setAppsFilter,
  setAppsToast,
} = appsSlice.actions

export default appsSlice.reducer
