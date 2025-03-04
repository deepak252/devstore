import User from '../../models/User'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import { validateLogin, validateRegistration } from '../utils/validation'

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
  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken

  user = await user.save()

  return new ResponseSuccess(
    'Register successful',
    { user: user.toJSON(), accessToken, refreshToken },
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

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  user.refreshToken = refreshToken

  user = await user.save()

  return new ResponseSuccess(
    'Login successful',
    { user: user.toJSON(), accessToken, refreshToken },
    201
  )
})

export const signOutUser = asyncHandler(async (req, _) => {
  const { refreshToken } = req.body

  if (!refreshToken) {
    throw new ApiError('Refresh token missing')
  }
  // let user = await User.findByUsernameOrEmail(usernameOrEmail, usernameOrEmail)

  // if (!user || !(await user.comparePassword(password))) {
  //   throw new ApiError('Invalid credentials')
  // }

  // user.refreshToken = refreshToken

  // user = await user.save()

  return new ResponseSuccess('Logout successful', 201)
})
