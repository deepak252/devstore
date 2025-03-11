import { Schema, model, Model } from 'mongoose'
import { Platform } from '../constants/enums'
import { IBanner, IBannerMethods } from '../types/banner.types'

interface BannerModel extends Model<IBanner, object, IBannerMethods> {
  test: () => void
}

const bannerSchema = new Schema<IBanner, BannerModel, IBannerMethods>(
  {
    imgUrl: {
      type: String,
      required: true,
      unique: true
    },
    redirectUrl: {
      type: String,
      required: true,
      unique: true
    },
    platform: {
      type: String,
      enum: Object.values(Platform)
    },
    ref: {
      type: Schema.Types.ObjectId
    }
  },
  {
    timestamps: true
  }
)

bannerSchema.index({ name: 'text' })

const Banner = model<IBanner, BannerModel>('Category', bannerSchema)

export default Banner
