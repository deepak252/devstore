import { ApiError } from '../utils/ApiError'
import { ResponseSuccess } from '../utils/ApiResponse'
import {
  validateCreateProject,
  validateUpdateProject
} from '../utils/validation'
import asyncHandler from '../utils/asyncHandler'
import ProjectService from '../../services/ProjectService'
import Project from '../../models/Project'
import { Platform } from '../../constants/enums'

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
  const { page, limit } = req.query
  const platform = req.platform || Platform.android

  const result = await ProjectService.getProjects(
    platform,
    Number(page) || 1,
    Number(limit) || 10
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

// export const createProject = asyncHandler(async (req, _) => {
//   const {
//     attachmentIcon = [],
//     attachmentImages = [],
//     attachmentGraphic = []
//   }: any = req.files
//   try {
//     const { error } = validateCreateProject(req.body)
//     if (error) {
//       throw new ApiError(error.details[0].message)
//     }

//     if (!attachmentIcon.length) {
//       throw new ApiError('Icon field is required')
//     }
//     // const s3Service = new S3Service(S3_MEDIA_BUCKET)

//     const project = await ProjectService.createProject(
//       req.user.userId,
//       req.body
//     )

//     return new ResponseSuccess(
//       'Project created successfully',
//       project.toJSON(),
//       201
//     )
//   } finally {
//     if (req.file) {
//       // removeFile(req.file.path)
//       removeFiles([
//         ...attachmentIcon.map((e: Express.Multer.File) => e.path),
//         ...attachmentImages.map((e: Express.Multer.File) => e.path),
//         ...attachmentGraphic.map((e: Express.Multer.File) => e.path)
//       ])
//     }
//   }
// })
