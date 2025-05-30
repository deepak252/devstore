import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import { validateCreateBanner } from '../utils/validation'
import asyncHandler from '../utils/asyncHandler'
import BannerService from '../../services/LikeService'

export const createBanner = asyncHandler(async (req, _) => {
  const { error } = validateCreateBanner(req.body)
  if (error) {
    throw new ApiError(error.details[0].message)
  }
  const { img, redirectUrl, platform, ref } = req.body

  const category = await BannerService.createBanner(
    img,
    redirectUrl,
    platform,
    ref
  )

  return new ResponseSuccess(
    'Banner created successfully',
    category.toJSON(),
    201
  )
})

export const getBanners = asyncHandler(async (req, __) => {
  const result = await BannerService.getBanners(req.projectType as any)
  return new ResponseSuccess('Banners fetched successfully', result)
})
