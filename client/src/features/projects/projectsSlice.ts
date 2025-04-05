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
    isLoading: boolean
    isSuccessful?: boolean
  }
  banner: {
    list: Banner[]
    isLoading: boolean
  }
  projectDelete: {
    projectId?: string
    isConfirm?: boolean
    isLoading?: boolean
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
  projectDelete: {},
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

    // Create Project Form
    createProject: (state, _: PayloadAction<ProjectFormValues>) => {
      state.projectForm.isLoading = true
    },
    createProjectSuccess: (state) => {
      state.projectForm = {
        ...initialState.projectForm,
        isSuccessful: true,
      }
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

    // Edit Project
    editProject: (state, _: PayloadAction<Partial<ProjectFormValues>>) => {
      state.projectForm.isLoading = true
    },
    editProjectSuccess: (state) => {
      state.projectForm = {
        ...initialState.projectForm,
        isSuccessful: true,
      }
      state.toastData = {
        type: 'success',
        message:
          'Your changes are being saved. The post will be updated shortly.',
      }
    },
    editProjectFailure: (state, action) => {
      state.projectForm.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload || 'Something went wrong',
      }
    },

    resetProjectForm: (state) => {
      state.projectForm = initialState.projectForm
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

    confirmDeleteProject: (
      state,
      action: PayloadAction<{ projectId: string }>
    ) => {
      state.projectDelete = {
        projectId: action.payload.projectId,
        isConfirm: true,
      }
    },
    cancelDeleteProject: (state) => {
      state.projectDelete = initialState.projectDelete
    },
    deleteProject: (state) => {
      state.projectDelete.isLoading = true
    },
    deleteProjectSuccess: (state) => {
      state.projectDelete = initialState.projectDelete
      state.toastData = {
        type: 'success',
        message: 'Project deleted successfully.',
      }
    },
    deleteProjectFailure: (state, action) => {
      state.projectDelete = initialState.projectDelete
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

  editProject,
  editProjectSuccess,
  editProjectFailure,

  resetProjectForm,

  uploadProjectMedia,
  uploadProjectMediaSuccess,
  uploadProjectMediaFailure,
  uploadProjectMediaCancelled,

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

  confirmDeleteProject,
  cancelDeleteProject,
  deleteProject,
  deleteProjectFailure,
  deleteProjectSuccess,

  setProjectsFilter,
  setProjectsToast,
} = projectsSlice.actions

export default projectsSlice.reducer
