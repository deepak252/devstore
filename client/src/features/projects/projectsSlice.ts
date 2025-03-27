import {
  ProjectListItem,
  Banner,
  Platform,
  ProjectDetails,
  ToastData,
  PaginatedList,
  ProjectFormValues,
} from '@/shared.types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectSearchFilter } from './projects.types'

type ProjectsState = {
  data: PaginatedList<ProjectListItem>
  filter: {
    platform: Platform
    categories: string[]
  }
  projectDetails: {
    data: ProjectDetails | null
    isLoading: boolean
  }
  projectForm: {
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
  home: PaginatedList<ProjectListItem>
  toastData?: ToastData | null
}

const initialState: ProjectsState = {
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
  projectDetails: {
    data: null,
    isLoading: false,
  },
  projectForm: {
    // data: formDataInitialState,
    isOpen: false,
    isLoading: false,
    media: { isUploading: false },
  },
  banner: {
    list: [],
    isLoading: false,
  },
  home: {
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    totalResults: 0,
    isLoading: false,
  },
}

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    // Projects List
    getProjects: (state, _: PayloadAction<ProjectSearchFilter | undefined>) => {
      state.data.isLoading = true
    },
    getProjectsSuccess: (state, action) => {
      const { projects = [], metadata = {} } = action.payload || {}
      state.data.isLoading = false
      state.data.list = projects
      state.data.page = metadata.currentPage
      state.data.limit = metadata.itemsPerPage
      state.data.totalPages = metadata.totalPages
      state.data.totalResults = metadata.totalItems
    },
    getProjectsFailure: (state, action) => {
      state.data.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    // Project Details
    getProjectDetails: (
      state,
      action: PayloadAction<{ projectId: string }>
    ) => {
      if (action.payload.projectId !== state.projectDetails.data?._id) {
        state.projectDetails = {
          isLoading: true,
          data: null,
        }
      }
    },
    getProjectDetailsSuccess: (state, action) => {
      state.projectDetails = {
        isLoading: false,
        data: action.payload,
      }
    },
    getProjectDetailsFailure: (state) => {
      state.projectDetails.isLoading = false
    },

    toggleCreateProjectFormOpen: (state) => {
      state.projectForm.isOpen = !state.projectForm?.isOpen
    },

    // Create Project Form
    createProject: (state, _: PayloadAction<ProjectFormValues>) => {
      state.projectForm.isLoading = true
    },
    createProjectSuccess: (state) => {
      state.projectForm = initialState.projectForm
      state.toastData = {
        type: 'success',
        message: 'Your project is being processed. It will appear soon.',
      }
    },
    createProjectFailure: (state, action) => {
      state.projectForm.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },
    createProjectCancelled: (state, _) => {
      state.projectForm.isLoading = false
      console.log('createProjectCancelled')
    },
    // Upload Project Media
    uploadProjectMedia: (state, _: PayloadAction<{ icon: File }>) => {
      state.projectForm.media.isUploading = true
    },
    uploadProjectMediaSuccess: (state) => {
      state.projectForm = initialState.projectForm
      // state.toastData = {
      //   type: 'success',
      //   message: 'Project creation submitted',
      // }
    },
    uploadProjectMediaFailure: (state, action) => {
      state.projectForm.media.isUploading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Error while uploading project images',
      }
    },
    uploadProjectMediaCancelled: (state, _) => {
      state.projectForm.media.isUploading = false
      console.log('uploadProjectMediaCancelled')
    },

    getProjectBanners: (state, _) => {
      state.banner.isLoading = true
    },
    getProjectBannersSuccess: (state, action) => {
      state.banner.isLoading = false
      state.banner.list = action.payload
    },
    getProjectBannersFailure: (state, action) => {
      state.banner.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },

    // Home Projects List
    getHomeProjects: (state) => {
      state.home.isLoading = true
    },
    getHomeProjectsSuccess: (state, action) => {
      const { projects = [], metadata = {} } = action.payload || {}
      state.home.isLoading = false
      state.home.list = projects
      state.home.page = metadata.currentPage
      state.home.limit = metadata.itemsPerPage
      state.home.totalPages = metadata.totalPages
      state.home.totalResults = metadata.totalItems
    },
    getHomeProjectsFailure: (state, action) => {
      state.home.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },

    setProjectsFilter: (state, action) => {
      state.filter = action.payload
    },
    setProjectsToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
  },
})

export const {
  getProjects,
  getProjectsSuccess,
  getProjectsFailure,

  getProjectDetails,
  getProjectDetailsSuccess,
  getProjectDetailsFailure,

  createProject,
  createProjectSuccess,
  createProjectFailure,
  createProjectCancelled,

  uploadProjectMedia,
  uploadProjectMediaSuccess,
  uploadProjectMediaFailure,
  uploadProjectMediaCancelled,

  toggleCreateProjectFormOpen,

  // uploadProjectIcon,
  // uploadProjectIconSuccess,
  // uploadProjectIconFailure,
  // uploadProjectIconCancelled,

  getProjectBanners,
  getProjectBannersSuccess,
  getProjectBannersFailure,

  getHomeProjects,
  getHomeProjectsSuccess,
  getHomeProjectsFailure,

  setProjectsFilter,
  setProjectsToast,
} = projectsSlice.actions

export default projectsSlice.reducer
