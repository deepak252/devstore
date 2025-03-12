import CategoryService from '../../services/CategoryService'
import { ResponseSuccess } from '../utils/ApiResponse'
import asyncHandler from '../utils/asyncHandler'

export const getMetadata = asyncHandler(async (_, __) => {
  const categories = await CategoryService.getAllCategories()
  return new ResponseSuccess('Metadata fetched successfully', { categories })
})
