import { Platform, ProjectType } from '../constants/enums'
import Banner from '../models/Banner'
import { IProject } from '../types/project.types'

export default class BannerService {
  static createBanner = async (
    img: string,
    redirectUrl: string,
    platforms?: Platform[],
    ref?: string
  ) => {
    const banner = await Banner.create({
      img,
      redirectUrl,
      platforms,
      ref
    })

    return banner
  }

  static createOrUpdateProjectBanner = async (project: IProject) => {
    const { _id: projectId, platforms, active, banner: bannerImg } = project
    let banner = await Banner.findOne({ project: projectId })

    if (!active || !bannerImg) {
      if (banner) {
        banner.active = false
        banner.redirectUrl = this.generateRedirectUrl(projectId)
        banner.platforms = platforms
        await banner.save()
      }
      return
    }

    if (!banner) {
      banner = await Banner.create({
        project: projectId,
        img: bannerImg,
        redirectUrl: this.generateRedirectUrl(projectId),
        platforms,
        active: true
      })
    } else {
      banner.img = bannerImg as any
      banner.active = true
      banner.redirectUrl = this.generateRedirectUrl(projectId)
      banner.platforms = platforms
      await banner.save()
    }

    return banner
  }

  static getBanners = async (projectType: ProjectType) => {
    // const banners = await Banner.find()
    // if (banners) {
    //   return banners
    // }
    // let platforms = [Platform.website]
    // if (projectType == ProjectType.app) {
    //   platforms = [Platform.android, Platform.ios]
    // }
    let platforms: Platform[] = []
    if ([ProjectType.all, ProjectType.app].includes(projectType)) {
      platforms = [Platform.android, Platform.ios]
    }
    if ([ProjectType.all, ProjectType.web].includes(projectType)) {
      platforms.push(Platform.website)
    }

    const filter = platforms
      ? [
          {
            $match: {
              platforms: { $in: platforms }
            }
          }
        ]
      : []
    const result = await Banner.aggregate([
      ...filter,
      {
        $lookup: {
          from: 'remotefiles',
          localField: 'img',
          foreignField: '_id',
          as: 'img'
        }
      },
      { $unwind: '$img' },
      {
        $project: {
          redirectUrl: 1,
          platforms: 1,
          img: {
            _id: 1,
            url: 1,
            mimeType: 1
          }
        }
      }
    ])

    return result
  }

  static deleteBanner = async (projectId: string) => {
    if (!projectId) {
      return
    }
    const banner = await Banner.findOneAndDelete({
      project: projectId
    })
    return banner
  }

  static generateRedirectUrl = (projectId: string) => {
    if (projectId) {
      return `/projects/${projectId}`
    }
    return ''
  }
}
