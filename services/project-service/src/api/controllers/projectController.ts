import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import {
  validateCreateProject,
  validateUpdateProject
} from '../utils/validation'
import asyncHandler from '../utils/asyncHandler'
import ProjectService from '../../services/ProjectService'
import Project from '../../models/Project'

export const createProject = asyncHandler(async (req, _) => {
  const { error } = validateCreateProject(req.body)
  if (error) {
    throw new ApiError(error.details[0].message)
  }

  const project = await ProjectService.createProject(req.user.userId, req.body)

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

export const getProjectDetails = asyncHandler(async (req, _) => {
  const { projectId } = req.params

  const result = await ProjectService.getProject(projectId)
  if (!result) {
    throw new ApiError('Project not found', 404)
  }
  return new ResponseSuccess('Project fetched successfully', result)
})

export const updateProject = asyncHandler(async (req, _) => {
  const { error } = validateUpdateProject(req.body)
  if (error) {
    throw new ApiError(error.details[0].message)
  }
  const projectId = req.params.projectId
  const {
    type,
    name,
    isPrivate,
    description,
    icon,
    video,
    featureGraphic,
    images,
    demoUrl,
    sourceCodeUrl
  } = req.body

  const updatedProject = await Project.findOneAndUpdate(
    {
      _id: projectId,
      owner: req.user.userId
    },
    {
      type,
      name,
      isPrivate,
      description,
      icon,
      video,
      featureGraphic,
      images,
      demoUrl,
      sourceCodeUrl
    },
    { new: true }
  )

  if (!updatedProject) {
    throw new ApiError('Project not found', 404)
  }

  return new ResponseSuccess(
    'Project updated successfully',
    updatedProject?.toJSON()
  )
})

export const deleteProject = asyncHandler(async (req, _) => {
  const { projectId } = req.params

  const result = await ProjectService.deleteProject(projectId, req.user.userId)
  if (!result) {
    throw new ApiError('Project not found', 404)
  }
  return new ResponseSuccess('Project deleted successfully', result)
})
