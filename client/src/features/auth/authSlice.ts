import { ToastData } from '@/shared.types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { SignInFormValues, SignUpFormValues } from './auth.types'

type AuthState = {
  isAuthenticated?: boolean
  isLoading?: boolean
  isConfirmSignOut?: boolean
  isEmailVerificationSent?: boolean
  username: {
    value?: string
    isAvailable?: boolean
    isLoading: boolean
    error?: string
  }
  toastData?: ToastData | null
}

const initialState: AuthState = {
  username: {
    value: '',
    isAvailable: false,
    isLoading: false,
  },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign In
    signIn: (state, _: PayloadAction<SignInFormValues>) => {
      state.isLoading = true
    },
    signInSuccess: (state) => {
      state.isLoading = false
      state.isAuthenticated = true
    },
    signInFailure: (state, action) => {
      state.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    // Sign Up
    signUp: (state, _: PayloadAction<SignUpFormValues>) => {
      state.isLoading = true
    },
    signUpSuccess: (state) => {
      state.isLoading = false
      state.isAuthenticated = true
    },
    signUpFailure: (state, action) => {
      state.isLoading = false
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    // emailVerify: (state) => {
    //   state.isLoading = false
    //   state.isEmailVerificationPending = true
    // },
    // Verify email
    verifyEmail: (state, _: PayloadAction<{ token: string }>) => {
      state.isLoading = true
    },
    verifyEmailSuccess: (state) => {
      state.isLoading = false
      state.isAuthenticated = true
    },
    verifyEmailFailure: (state) => {
      state.isLoading = false
    },

    // Resend email verification link
    sendEmailVerification: (state, _: PayloadAction<{ email: string }>) => {
      state.isLoading = true
      state.isEmailVerificationSent = true
    },
    sendEmailVerificationSuccess: (state) => {
      state.isLoading = false
      state.isEmailVerificationSent = true
    },
    sendEmailVerificationFailure: (state) => {
      state.isLoading = false
      state.isEmailVerificationSent = true
    },

    // Sign Out
    confirmSignOut: (state) => {
      state.isConfirmSignOut = true
    },
    cancelSignOut: (state) => {
      state.isConfirmSignOut = false
    },
    signOut: (state) => {
      state.isLoading = true
      state.isConfirmSignOut = false
    },
    signOutSuccess: (state) => {
      state.isLoading = false
      state.isAuthenticated = false
      state.isConfirmSignOut = false
    },
    signOutFailure: (state) => {
      state.isLoading = false
      state.isConfirmSignOut = false
    },

    // Check username available
    checkUsername: (state, action: PayloadAction<{ username: string }>) => {
      state.username = {
        value: action.payload.username,
        isAvailable: false,
        isLoading: true,
      }
    },
    checkUsernameSuccess: (state) => {
      state.username.isLoading = false
      state.username.isAvailable = true
    },
    checkUsernameFailure: (state, action) => {
      state.username.isLoading = false
      state.username.isAvailable = false
      state.username.error = action.payload
      state.toastData = {
        type: 'failure',
        message: action.payload,
      }
    },

    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },

    setAuthToast: (state, action: PayloadAction<ToastData | null>) => {
      state.toastData = action.payload
    },
    resetAuthState: (state) => {
      return {
        ...initialState,
        toastData: state.toastData,
      }
    },
  },
})

export const {
  signIn,
  signInSuccess,
  signInFailure,

  signUp,
  signUpSuccess,
  signUpFailure,

  // emailVerify,

  verifyEmail,
  verifyEmailSuccess,
  verifyEmailFailure,

  sendEmailVerification,
  sendEmailVerificationSuccess,
  sendEmailVerificationFailure,

  confirmSignOut,
  cancelSignOut,
  signOut,
  signOutSuccess,
  signOutFailure,

  checkUsername,
  checkUsernameSuccess,
  checkUsernameFailure,

  setAuthToast,
  resetAuthState,
} = authSlice.actions

export default authSlice.reducer
