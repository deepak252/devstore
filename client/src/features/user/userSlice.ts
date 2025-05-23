import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { signOutSuccess } from '../auth/authSlice'
import { User } from './user.types'
import { PaginatedList, ProjectListItem, ToastData } from '@/shared.types'

type UserState = {
  profile: {
    data?: User
    isLoading?: boolean
    isUpdating?: boolean
  }
  projects: PaginatedList<ProjectListItem> & {
    isOrdering?: boolean
  }
  users: PaginatedList<User>
  otherProfile: {
    data?: User
    isLoading?: boolean
    isUpdating?: boolean
  }
  toastData?: ToastData | null
}

const initialState: UserState = {
  profile: {
    isLoading: false,
  },
  otherProfile: {},
  projects: {
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    totalResults: 0,
    isLoading: false,
    isOrdering: false,
  },
  users: {
    list: [],
    page: 1,
    limit: 10,
    totalPages: 0,
    totalResults: 0,
    isLoading: false,
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getProfile: (state) => {
      state.profile.isLoading = true
    },
    getProfileSuccess: (state, action: PayloadAction<User>) => {
      state.profile.isLoading = false
      state.profile.data = action.payload
    },
    getProfileFailure: (state, action) => {
      state.profile.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    getUserProjects: (state, _: PayloadAction<{ userId: string }>) => {
      state.projects = {
        ...initialState.projects,
        isLoading: true,
      }
    },
    getUserProjectsSuccess: (state, action) => {
      const { projects = [], metadata = {} } = action.payload || {}
      state.projects.isLoading = false
      state.projects.list = projects
      state.projects.page = metadata.currentPage
      state.projects.limit = metadata.itemsPerPage
      state.projects.totalPages = metadata.totalPages
      state.projects.totalResults = metadata.totalItems
    },
    getUserProjectsFailure: (state, action) => {
      state.projects.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    orderUserProjects: (
      state,
      _: PayloadAction<{
        projectId: string
        oldIndex: number
        newIndex: number
      }>
    ) => {
      state.projects.isOrdering = true
    },
    orderUserProjectsSuccess: (
      state,
      action: PayloadAction<{
        projectId: string
        oldIndex: number
        newIndex: number
      }>
    ) => {
      const { projectId, oldIndex, newIndex } = action.payload || {}
      state.projects.isOrdering = false
      // state.projects.list = projects
    },
    orderUserProjectsFailure: (state, action) => {
      state.projects.isOrdering = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    getUsers: (state) => {
      state.users = {
        ...initialState.users,
        isLoading: true,
      }
    },
    getUsersSuccess: (state, action) => {
      const { users = [], metadata = {} } = action.payload || {}
      state.users.isLoading = false
      state.users.list = users
      state.users.page = metadata.currentPage
      state.users.limit = metadata.itemsPerPage
      state.users.totalPages = metadata.totalPages
      state.users.totalResults = metadata.totalItems
    },
    getUsersFailure: (state, action) => {
      state.users.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    updateProfile: (state, _: PayloadAction<Partial<User>>) => {
      state.profile.isUpdating = true
    },
    updateProfileSuccess: (state, action: PayloadAction<User>) => {
      state.profile.isUpdating = false
      state.profile.data = action.payload
      state.toastData = {
        type: 'success',
        message: 'Profile updated successfully',
      }
    },
    updateProfileFailure: (state, action) => {
      state.profile.isUpdating = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    getOtherProfile: (state, _: PayloadAction<{ username: string }>) => {
      state.otherProfile.isLoading = true
    },
    getOtherProfileSuccess: (state, action: PayloadAction<User>) => {
      state.otherProfile.isLoading = false
      state.otherProfile.data = action.payload
    },
    getOtherProfileFailure: (state, action) => {
      state.otherProfile.isLoading = false
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
  extraReducers: (builder) => {
    builder
      // .addCase(signInSuccess, (state, action) => {
      //   state.profile.data = action.payload?.data
      // })
      // .addCase(signUpSuccess, (state, action) => {
      //   state.profile.data = action.payload?.data
      // })
      .addCase(signOutSuccess, () => initialState)
  },
})

export const {
  getProfile,
  getProfileSuccess,
  getProfileFailure,

  updateProfile,
  updateProfileSuccess,
  updateProfileFailure,

  getUserProjects,
  getUserProjectsSuccess,
  getUserProjectsFailure,

  orderUserProjects,
  orderUserProjectsSuccess,
  orderUserProjectsFailure,

  getUsers,
  getUsersSuccess,
  getUsersFailure,

  getOtherProfile,
  getOtherProfileFailure,
  getOtherProfileSuccess,

  setUserToast,
  resetUserState,
} = userSlice.actions

export default userSlice.reducer
