import { redisClient } from '../config/redis'
import { Platform } from '../constants/enums'
import Category from '../models/Following'

export default class CategoryService {
  static CACHE_KEY = 'content:categories'
  static invalidateCategoryCache = async () => {
    await redisClient.del(this.CACHE_KEY)
  }

  static createCategory = async (name: string, platform?: Platform) => {
    const category = await Category.create({
      name,
      platform
    })

    await this.invalidateCategoryCache()

    return category
  }

  static getAllCategories = async () => {
    const cachedCategories = await redisClient.get(this.CACHE_KEY)
    if (cachedCategories) {
      return JSON.parse(cachedCategories)
    }
    const categories = await Category.find().select('_id, name')
    if (categories) {
      await redisClient.setex(
        this.CACHE_KEY,
        24 * 3600,
        JSON.stringify(categories)
      )
      return categories
    }
  }
}
