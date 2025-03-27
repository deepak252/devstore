import { Platform, ProjectType } from '../constants/enums'

export const getProjectType = (platforms: Platform[]) => {
  if (
    platforms.includes(Platform.android) &&
    platforms.includes(Platform.ios) &&
    platforms.includes(Platform.website)
  ) {
    return ProjectType.all
  }
  if (
    platforms.includes(Platform.android) &&
    platforms.includes(Platform.ios)
  ) {
    return ProjectType.app
  }

  if (platforms.includes(Platform.website)) {
    return ProjectType.web
  }
  return ProjectType.all
}
