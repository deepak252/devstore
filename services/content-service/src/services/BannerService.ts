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

    console.log(banner)

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
    console.log(banner)

    return banner
  }

  static getBanners = async () => {
    const banners = await Banner.find()
    if (banners) {
      return banners
    }
  }

  static generateRedirectUrl = (platform: Platform, projectId: string) => {
    if (platform && projectId) {
      return `/${platform}/${projectId}`
    }
    return ''
  }
}
