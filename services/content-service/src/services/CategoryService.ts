import { Platform } from '../constants/enums'
import Category from '../models/Category'

export default class CategoryService {
  // static invalidateMetadataCache = async (platform: Platform) => {
  //   const keys = await redisClient.keys(`${projectType}s:*`)
  //   if (keys.length) {
  //     await redisClient.del(keys)
  //   }
  // }

  static createCategory = async (name: string, platform?: Platform) => {
    const category = await Category.create({
      name,
      platform
    })

    // await this.invalidateMetadataCache(platform)

    return category
  }

  static getAllCategories = async () => {
    // const cacheKey = `project:${projectId}`
    // const cachedProject = await redisClient.get(cacheKey)
    // if (cachedProject) {
    //   return JSON.parse(cachedProject)
    // }
    const categories = await Category.find()
    if (categories) {
      // await redisClient.setex(cacheKey, 3600, JSON.stringify(post))
      return categories
    }
  }
}
