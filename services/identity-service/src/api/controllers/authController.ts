import User from '../../models/User'
import AuthService from '../../services/AuthService'
import UserService from '../../services/UserService'
import { verifyEmailVerificationToken } from '../../utils/authUtil'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import {
  validateEmailVerification,
  validateLogin,
  validateRegistration
} from '../utils/validation'

export const signUpUser = asyncHandler(async (req, _) => {
  const { username, fullname, email, password } = req.body

  const { error } = validateRegistration({
    username,
    fullname,
    email,
    password
  })
  if (error) {
    throw new ApiError(error.details[0].message)
  }
  let user = await User.findByUsernameOrEmail(username, email)
  if (user) {
    throw new ApiError('User already exists')
  }
  user = new User({
    username,
    fullname,
    email,
    password
  })
  // const refreshToken = user.generateRefreshToken()
  // user.refreshToken = refreshToken

  user = await user.save()
  await UserService.invalidateUserCache()

  const token = user.generateEmailVerificationToken()
  const result = await AuthService.sendEmailVerificationLink(user.email, token)

  return new ResponseSuccess(
    `Email verification link sent to the email ${user.email}`,
    result,
    201
  )
})

export const signInUser = asyncHandler(async (req, _) => {
  const { usernameOrEmail, password } = req.body

  const { error } = validateLogin({ usernameOrEmail, password })
  if (error) {
    throw new ApiError(error.details[0].message)
  }
  let user = await User.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError('Invalid credentials')
  }

  if (!user.isEmailVerified) {
    const token = user.generateEmailVerificationToken()
    const result = await AuthService.sendEmailVerificationLink(
      user.email,
      token
    )
    return new ResponseSuccess(
      `Email verification link sent to the email ${user.email}`,
      result,
      202
    )
  }
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken

  user = await user.save()

  return new ResponseSuccess(
    'Login successful',
    { user: user.toJSON(), accessToken, refreshToken },
    200
  )
})

export const resendEmailVerification = asyncHandler(async (req, _) => {
  const { email } = req.body

  const { error } = validateEmailVerification({ email })
  if (error) {
    throw new ApiError(error.details[0].message)
  }
  const user = await User.findByEmail(email)

  if (!user || user.isEmailVerified) {
    throw new ApiError('Could not sent email verifcation link')
  }
  const token = user.generateEmailVerificationToken()
  const result = await AuthService.sendEmailVerificationLink(user.email, token)
  return new ResponseSuccess(
    `Email verification link sent to the email ${user.email}`,
    result,
    200
  )
})

export const verifyEmail = asyncHandler(async (req, _) => {
  const token = req.query.token as string

  if (!token) {
    throw new ApiError('Token is required')
  }

  const { type, email } = verifyEmailVerificationToken(token)

  if (type !== 'email-verify' || !email) {
    throw new ApiError('Invalid token')
  }

  const user = await User.findByEmail(email)
  user.isEmailVerified = true
  await user.save()
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()
  return new ResponseSuccess(
    `Email verified successfully`,
    { user: user.toJSON(), accessToken, refreshToken },
    200
  )
})

export const signOutUser = asyncHandler(async (__, _) => {
  // const { refreshToken } = req.body

  // if (!refreshToken) {
  //   throw new ApiError('Refresh token missing')
  // }
  // let user = await User.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)

  // if (!user || !(await user.comparePassword(password))) {
  //   throw new ApiError('Invalid credentials')
  // }

  // user.refreshToken = refreshToken

  // user = await user.save()

  return new ResponseSuccess('Sign out successful', 201)
})
