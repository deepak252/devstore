/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOAST_INITIAL_DATA, ToastData } from '@/components/Toast'
import {
  AppListItem,
  Banner,
  ProjectFormValues,
  Platform,
  ProjectDetails,
  ProjectList,
} from '@/shared.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppFormValues } from './apps.types'

type AppsState = {
  data: ProjectList<AppListItem>
  filter: {
    platform: Platform
    categories: string[]
  }
  appDetails: {
    data: ProjectDetails | null
    isLoading: boolean
    error: string | null
  }
  appForm: {
    data: ProjectFormValues
    isOpen: boolean
    isMinimize: boolean
    isLoading: boolean
    error: string | null
    package: {
      info: null
      isLoading: boolean
      progress: number | null
      error: string | null
    }
  }
  banner: {
    list: Banner[]
    isLoading: boolean
    error: string | null
  }
  toastData: ToastData
}

const formDataInitialState: AppFormValues = {
  name: '',
  description: '',
  categories: [],
  sourceCode: '',
  isSourceCodePublic: true,
  isPrivate: false,
  // platform: 'android',
  attachmentPackage: null, // File Instance
  attachmentIcon: null,
  attachmentImages: [],
  attachmentVideo: null,
  attachmentGraphic: null,
}

const initialState: AppsState = {
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
  appDetails: {
    data: null,
    isLoading: false,
    error: null,
  },
  appForm: {
    data: formDataInitialState,
    isOpen: false,
    isMinimize: false,
    isLoading: false,
    error: null,
    package: {
      info: null,
      isLoading: false,
      progress: null,
      error: null,
    },
  },
  banner: {
    list: [],
    isLoading: false,
    error: null,
  },
  toastData: TOAST_INITIAL_DATA,
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
      state.data.isLoading = false
      state.data.error = null
      state.data.list = action.payload.data?.projects
    },
    getAppsFailure: (state, action) => {
      state.data.isLoading = false
      state.data.error = action.payload
    },
    // App Details
    getAppDetails: (state, _: PayloadAction<{ projectId: string }>) => {
      state.appDetails = {
        isLoading: true,
        error: null,
        data: null,
      }
    },
    getAppDetailsSuccess: (state, action) => {
      state.appDetails.isLoading = false
      state.appDetails.error = null
      state.appDetails.data = action.payload?.data
    },
    getAppDetailsFailure: (state, action) => {
      state.appDetails.isLoading = false
      state.appDetails.error = action.payload
    },
    // Create App Form
    toggleCreateAppFormOpen: (state) => {
      state.appForm.isOpen = !state.appForm?.isOpen
      if (!state.appForm.isOpen) {
        // Form Closed
        state.appForm.isMinimize = false
        state.appForm.data = formDataInitialState
      }
    },
    toggleCreateAppFormMinimize: (state) => {
      state.appForm.isMinimize = !state.appForm?.isMinimize
    },
    setCreateAppFormData: (state, action: PayloadAction<AppFormValues>) => {
      state.appForm.data = action.payload
    },
    createApp: (state, _: PayloadAction<FormData>) => {
      state.appForm.isLoading = true
      state.appForm.error = null
    },
    createAppSuccess: (state) => {
      state.appForm = initialState.appForm
      state.toastData = {
        type: 'success',
        message: 'App added successfully!',
      }
    },
    createAppFailure: (state, action) => {
      state.appForm.isLoading = false
      state.appForm.error = action.payload
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    createAppCancelled: (state, _) => {
      state.appForm.isLoading = false
      state.appForm.error = null
      console.log('createAppCancelled')
    },
    uploadAppPackage: (state, _) => {
      state.appForm.package.isLoading = true
      state.appForm.package.error = null
      state.appForm.package.info = null
    },
    uploadAppPackageProgress: (state, action) => {
      state.appForm.package.progress = action.payload
    },
    uploadAppPackageSuccess: (state, action) => {
      state.appForm.package.error = null
      state.appForm.package.isLoading = false
      state.appForm.package.info = action.payload?.data
    },
    uploadAppPackageCancelled: (state, _) => {
      state.appForm.package = {
        info: null,
        isLoading: false,
        progress: null,
        error: null,
      }
      console.log('uploadAppCancelled')
    },
    uploadAppPackageFailure: (state, action) => {
      state.appForm.package = {
        info: null,
        isLoading: false,
        progress: null,
        error: action.payload,
      }
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    getAppsBanner: (state, _) => {
      state.banner.isLoading = true
    },
    getAppsBannerSuccess: (state, action) => {
      state.banner.isLoading = false
      state.banner.error = null
      state.banner.list = action.payload?.data
    },
    getAppsBannerFailure: (state, action) => {
      state.banner.isLoading = false
      state.banner.error = action.payload
    },
    setAppsFilter: (state, action) => {
      state.filter = action.payload
    },
    setAppsToast: (state, action) => {
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
  toggleCreateAppFormOpen,
  toggleCreateAppFormMinimize,
  setCreateAppFormData,
  createApp,
  createAppSuccess,
  createAppFailure,
  createAppCancelled,
  uploadAppPackage,
  uploadAppPackageProgress,
  uploadAppPackageSuccess,
  uploadAppPackageCancelled,
  uploadAppPackageFailure,
  getAppsBanner,
  getAppsBannerSuccess,
  getAppsBannerFailure,
  setAppsFilter,
  setAppsToast,
} = appsSlice.actions

export default appsSlice.reducer
