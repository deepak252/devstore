import { Schema, model, Model } from 'mongoose'
import { ICategory, ICategoryMethods } from '../types/category.types'
import { Platform } from '../constants/enums'

interface CategoryModel extends Model<ICategory, object, ICategoryMethods> {
  test: () => void
}

const categorySchema = new Schema<ICategory, CategoryModel, ICategoryMethods>(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    platform: {
      type: String,
      enum: Object.values(Platform)
    }
  },
  {
    timestamps: true
  }
)

const Category = model<ICategory, CategoryModel>('Category', categorySchema)

export default Category
