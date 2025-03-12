import { Platform } from '../constants/enums'
import Banner from '../models/Banner'

export default class BannerService {
  static createBanner = async (
    imgUrl: string,
    redirectUrl: string,
    platform?: Platform,
    ref?: string
  ) => {
    const banner = await Banner.create({
      imgUrl,
      redirectUrl,
      platform,
      ref
    })

    return banner
  }

  static getBanners = async () => {
    const banners = await Banner.find()
    if (banners) {
      return banners
    }
  }
}
