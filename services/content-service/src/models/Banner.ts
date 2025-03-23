import { Schema, model, Model } from 'mongoose'
import { Platform } from '../constants/enums'
import { IBanner, IBannerMethods } from '../types/banner.types'

interface BannerModel extends Model<IBanner, object, IBannerMethods> {
  test: () => void
}

const bannerSchema = new Schema<IBanner, BannerModel, IBannerMethods>(
  {
    img: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'RemoteFile'
    },
    project: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      ref: 'Project'
    },
    redirectUrl: {
      type: String,
      required: true,
      unique: true
    },
    platforms: {
      type: [String],
      enum: Object.values(Platform)
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
)

bannerSchema.index({ name: 'text' })

const Banner = model<IBanner, BannerModel>('Banner', bannerSchema)

export default Banner
