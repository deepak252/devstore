import { Schema, model, Model } from 'mongoose'
import { ICategory, ICategoryMethods } from '../types/category.types'
import { Platform } from '../constants/enums'

interface CategoryModel extends Model<ICategory, object, ICategoryMethods> {
  test: () => void
}

const categorySchema = new Schema<ICategory, CategoryModel, ICategoryMethods>(
  {
    platform: {
      type: String,
      enum: Object.values(Platform),
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)

categorySchema.index({ name: 'text' })

const Category = model<ICategory, CategoryModel>('Category', categorySchema)

export default Category
