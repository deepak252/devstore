import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import { validateCreateBanner } from '../utils/validation'
import asyncHandler from '../utils/asyncHandler'
import CategoryService from '../../services/CategoryService'
import BannerService from '../../services/BannerService'

export const createBanner = asyncHandler(async (req, _) => {
  const { name, platform } = req.body
  const { error } = validateCreateBanner(req.body)
  if (error) {
    throw new ApiError(error.details[0].message)
  }

  const category = await BannerService.createBanner(name, platform)

  return new ResponseSuccess(
    'Category created successfully',
    category.toJSON(),
    201
  )
})

export const getCategories = asyncHandler(async (_, __) => {
  const result = await CategoryService.getAllCategories()
  return new ResponseSuccess('Categories fetched successfully', result)
})
