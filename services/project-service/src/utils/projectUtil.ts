import { Platform, ProjectType } from '../constants/enums'

export const getProjectType = (platforms: Platform[]) => {
  const isAndroid = platforms.includes(Platform.android)
  const isIos = platforms.includes(Platform.ios)
  const isWeb = platforms.includes(Platform.website)
  const isApp = isAndroid || isIos
  if (isApp && isWeb) {
    return ProjectType.all
  }
  if (isApp) {
    return ProjectType.app
  }
  if (isWeb) {
    return ProjectType.web
  }
  return ProjectType.all
}
