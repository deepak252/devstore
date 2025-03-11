import { Platform } from '../constants/enums'
import Banner from '../models/Banner'

export default class BannerService {
  static createBanner = async (name: string, platform?: Platform) => {
    const banner = await Banner.create({
      name,
      platform
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
