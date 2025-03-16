import { Platform } from '../constants/enums'
import Banner from '../models/Banner'
import { IProject } from '../types/project.types'

export default class BannerService {
  static createBanner = async (
    img: string,
    redirectUrl: string,
    platform?: Platform,
    ref?: string
  ) => {
    const banner = await Banner.create({
      img,
      redirectUrl,
      platform,
      ref
    })

    return banner
  }

  static createOrUpdateProjectBanner = async (project: IProject) => {
    const { _id: projectId, platform, active, banner: bannerImg } = project
    let banner = await Banner.findOne({ project: projectId })

    if (!active || !bannerImg) {
      if (banner) {
        banner.active = false
        banner.redirectUrl = this.generateRedirectUrl(platform, projectId)
        banner.platform = platform
        await banner.save()
      }
      return
    }

    if (!banner) {
      banner = await Banner.create({
        project: projectId,
        img: bannerImg,
        redirectUrl: this.generateRedirectUrl(platform, projectId),
        platform,
        active: true
      })
    } else {
      banner.img = bannerImg as any
      banner.active = true
      banner.redirectUrl = this.generateRedirectUrl(platform, projectId)
      banner.platform = platform
      await banner.save()
    }

    return banner
  }

  static getBanners = async (platform?: Platform | string) => {
    // const banners = await Banner.find()
    // if (banners) {
    //   return banners
    // }
    const filter = platform
      ? [
          {
            $match: {
              platform
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
          platform: 1,
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

  static generateRedirectUrl = (platform: Platform, projectId: string) => {
    if (platform && projectId) {
      if (platform === 'website') {
        return `/websites/${projectId}`
      }
      return `/apps/${projectId}`
    }
    return ''
  }
}
