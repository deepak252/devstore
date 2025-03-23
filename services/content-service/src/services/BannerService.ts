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
        banner.redirectUrl = this.generateRedirectUrl(platforms, projectId)
        banner.platforms = platforms
        await banner.save()
      }
      return
    }

    if (!banner) {
      banner = await Banner.create({
        project: projectId,
        img: bannerImg,
        redirectUrl: this.generateRedirectUrl(platforms, projectId),
        platforms,
        active: true
      })
    } else {
      banner.img = bannerImg as any
      banner.active = true
      banner.redirectUrl = this.generateRedirectUrl(platforms, projectId)
      banner.platforms = platforms
      await banner.save()
    }

    return banner
  }

  static getBanners = async (projectType: ProjectType | string) => {
    // const banners = await Banner.find()
    // if (banners) {
    //   return banners
    // }
    let platforms = [Platform.website]
    if (projectType == ProjectType.app) {
      platforms = [Platform.android, Platform.ios]
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

  static generateRedirectUrl = (platforms: Platform[], projectId: string) => {
    if (platforms.length && projectId) {
      if (platforms.includes(Platform.website)) {
        return `/websites/${projectId}`
      }
      return `/apps/${projectId}`
    }
    return ''
  }
}
