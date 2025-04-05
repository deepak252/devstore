import { platformMapping } from '@/constants'
import {
  ProjectDetails,
  ProjectFormError,
  ProjectFormValues,
} from '@/shared.types'
import { validateUrl } from '@/utils/validators'

export const validateProjectForm = (values: ProjectFormValues) => {
  const errors: ProjectFormError = {}
  const sourceCodeUrlError = validateUrl(values.sourceCodeUrl)
  const demoUrlError = validateUrl(values.demoUrl)

  if (!values.name?.trim()) {
    errors.name = 'Enter project name'
  }
  if (!values.platforms?.length) {
    errors.platforms = 'Select platform'
  }
  if (!values.icon && !values.attachmentIcon) {
    errors.attachmentIcon = 'Upload project icon'
  }
  if (sourceCodeUrlError) {
    errors.sourceCodeUrl = 'Invalid source code URL'
  }
  if (demoUrlError) {
    errors.demoUrl = 'Invalid demo URL'
  }

  return errors
}

export const generateProjectFormValues = (
  project: ProjectDetails
): ProjectFormValues => {
  return {
    _id: project._id,
    name: project.name,
    description: project.description,
    isPrivate: project.isPrivate,
    platforms: project.platforms?.map((e) => ({
      label: platformMapping[e],
      value: e,
    })),
    // ?.map((e) => platformMapping[e])
    // .toDropdownOptions(),
    categories: project.categories?.toDropdownOptions(),
    demoUrl: project.demoUrl,
    sourceCodeUrl: project.sourceCodeUrl,
    icon: project.icon,
    banner: project.banner,
    images: project.images,
    attachmentImages: [],
  }
}
