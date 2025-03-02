import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import { validateCreateProject } from '../utils/validation'
import asyncHandler from '../utils/asyncHandler'
import CategoryService from '../../services/MetadataService'

export const createCategory = asyncHandler(async (req, _) => {
  const { error } = validateCreateProject(req.body)
  if (error) {
    throw new ApiError(error.details[0].message)
  }

  const project = await CategoryService.createProject(req.user.userId, req.body)

  return new ResponseSuccess(
    'Project created successfully',
    project.toJSON(),
    201
  )
})

export const getProjects = asyncHandler(async (req, _) => {
  const { page = 1, limit = 10 } = req.query
  const projectType = req.projectType || 'app'

  const result = await ProjectService.getProjects(
    projectType,
    Number(page),
    Number(limit)
  )

  return new ResponseSuccess('Projects fetched successfully', result)
})

export const deleteProject = asyncHandler(async (req, _) => {
  const { projectId } = req.params

  const result = await ProjectService.deleteProject(projectId, req.user.userId)
  if (!result) {
    throw new ApiError('Project not found', 404)
  }
  return new ResponseSuccess('Project deleted successfully', result)
})
