/* eslint-disable @typescript-eslint/no-unused-vars */
import { TOAST_INITIAL_DATA, ToastData } from '@/components/Toast'
import {
  AppListItem,
  Banner,
  CreateAppFormData,
  CreateProjectFormData,
  Platform,
  ProjectDetails,
  ProjectList,
} from '@/shared.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
  createAppForm: {
    formData: CreateProjectFormData
    isOpen: boolean
    isMinimize: boolean
    isLoading: boolean
    error: string | null
  }
  appPackage: {
    info: null
    isLoading: boolean
    progress: number | null
    error: string | null
  }
  banner: {
    list: Banner[]
    isLoading: boolean
    error: string | null
  }
  toastData: ToastData
}

const formDataInitialState: CreateAppFormData = {
  name: '',
  description: '',
  categories: [],
  sourceCode: '',
  isSourceCodePublic: true,
  isPrivate: false,
  platform: 'android',
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
  createAppForm: {
    formData: formDataInitialState,
    isOpen: false,
    isMinimize: false,
    isLoading: false,
    error: null,
  },
  appPackage: {
    info: null,
    isLoading: false,
    progress: null,
    error: null,
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
      state.createAppForm.isOpen = !state.createAppForm?.isOpen
      if (!state.createAppForm.isOpen) {
        // Form Closed
        state.createAppForm.isMinimize = false
        state.createAppForm.formData = formDataInitialState
      }
    },
    toggleCreateAppFormMinimize: (state) => {
      state.createAppForm.isMinimize = !state.createAppForm?.isMinimize
    },
    setCreateAppFormData: (state, action: PayloadAction<CreateAppFormData>) => {
      state.createAppForm.formData = action.payload
    },
    createApp: (state, _: PayloadAction<FormData>) => {
      state.createAppForm.isLoading = true
      state.createAppForm.error = null
    },
    createAppSuccess: (state) => {
      state.createAppForm = initialState.createAppForm
      state.toastData = {
        type: 'success',
        message: 'App added successfully!',
      }
    },
    createAppFailure: (state, action) => {
      state.createAppForm.isLoading = false
      state.createAppForm.error = action.payload
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    createAppCancelled: (state, _) => {
      state.createAppForm.isLoading = false
      state.createAppForm.error = null
      console.log('createAppCancelled')
    },
    uploadAppPackage: (state, _) => {
      state.appPackage.isLoading = true
      state.appPackage.error = null
      state.appPackage.info = null
    },
    uploadAppPackageProgress: (state, action) => {
      state.appPackage.progress = action.payload
    },
    uploadAppPackageSuccess: (state, action) => {
      state.appPackage.error = null
      state.appPackage.isLoading = false
      state.appPackage.info = action.payload?.data
    },
    uploadAppPackageCancelled: (state, _) => {
      state.appPackage = {
        info: null,
        isLoading: false,
        progress: null,
        error: null,
      }
      console.log('uploadAppCancelled')
    },
    uploadAppPackageFailure: (state, action) => {
      state.appPackage = {
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
