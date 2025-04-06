import { Schema, model, HydratedDocument, Model } from 'mongoose'
import { IUser, IUserMethods } from '../types/user.types'
import {
  comparePassword,
  generateAccessToken,
  generateEmailVerificationToken,
  generatePasswordHash,
  generateRefreshToken
} from '../utils/authUtil'

interface UserModel extends Model<IUser, object, IUserMethods> {
  findByUsername(
    username: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>
  findByEmail(email: string): Promise<HydratedDocument<IUser, IUserMethods>>
  findByUsernameOrEmail(
    username: string,
    email: string
  ): Promise<HydratedDocument<IUser, IUserMethods>>
}

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
  {
    username: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Username is required']
    },
    fullname: {
      type: String,
      // required: true,
      trim: true
    },
    email: {
      type: String,
      index: true,
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, 'Email is required']
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
      sparse: true //allows multiple documents to have a null or missing phone
    },
    title: {
      type: String
    },
    headline: {
      type: String,
      trim: true
    },
    about: {
      type: String
    },
    profileImage: {
      type: Schema.Types.ObjectId,
      ref: 'RemoteFile'
    },
    password: {
      type: String,
      trim: true,
      required: [true, 'Password is required']
    },
    refreshToken: {
      type: String
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    statics: {
      findByUsername(username) {
        return this.findOne({ username })
      },
      findByEmail(email) {
        return this.findOne({ email })
      },
      findByUsernameOrEmail(username, email) {
        return this.findOne({
          $or: [{ email }, { username }]
        })
      }
    }
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      if (this.password.length < 4) {
        throw new Error('Password must contain at least 4 characters')
      }
      this.password = await generatePasswordHash(this.password)
    } catch (error: any) {
      return next(error)
    }
  }
})

userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return await comparePassword(candidatePassword, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return generateAccessToken({
    userId: this._id.toString(),
    email: this.email,
    username: this.username
  })
}

userSchema.methods.generateRefreshToken = function () {
  return generateRefreshToken({
    userId: this._id.toString()
  })
}

userSchema.methods.generateEmailVerificationToken = function () {
  return generateEmailVerificationToken({
    email: this.email.toString()
  })
}

userSchema.set('toJSON', {
  transform: (_, ret: Partial<IUser>) => {
    delete ret.password
    delete ret.refreshToken
    return ret
  }
})

const User = model<IUser, UserModel>('User', userSchema)
export default User
