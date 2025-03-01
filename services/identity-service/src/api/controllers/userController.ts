import User from '../../models/User'
import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'
import {
  validateCheckUsername,
  validateUpdateProfile
} from '../utils/validation'

export const getProfile = asyncHandler(async (req, _) => {
  const user = await User.findById(req.user.userId)

  if (!user) {
    throw new ApiError('User not found', 404)
  }

  return new ResponseSuccess('Profile fetched successfully', user?.toJSON())
})

export const updateProfile = asyncHandler(async (req, _) => {
  const { error } = validateUpdateProfile(req.body)
  if (error) {
    throw new ApiError(error.details[0].message)
  }
  const { fullname, headline, bio } = req.body

  const updatedUser = await User.findByIdAndUpdate(
    req.user.userId,
    {
      fullname,
      headline,
      bio
    },
    { new: true }
  )

  if (!updatedUser) {
    throw new ApiError('User not found', 404)
  }

  return new ResponseSuccess(
    'Profile updated successfully',
    updatedUser?.toJSON()
  )
})

export const deleteProfile = asyncHandler(async (req, _) => {
  const user = await User.findByIdAndDelete(req.user.userId)

  if (!user) {
    throw new ApiError('User not found', 404)
  }

  return new ResponseSuccess('Profile deleted successfully', user?.toJSON())
})

export const checkUsername = asyncHandler(async (req, _) => {
  const { username } = req.body

  const { error } = validateCheckUsername({ username })
  if (error) {
    throw new ApiError(error.details[0].message)
  }

  const user = await User.findByUsername(username)
  if (user) {
    throw new ApiError('Username is not available')
  }
  return new ResponseSuccess('Username is available', { username })
})

export const getUserByUsername = asyncHandler(async (req, _) => {
  const { username } = req.params

  const user = await User.findByUsername(username)
  if (!user) {
    throw new ApiError('User not found')
  }
  return new ResponseSuccess('User fetched successfully', { username })
})
