import { Schema } from 'mongoose'

export interface IUser {
  username: string
  fullname: string
  email: string
  password: string
  profileImage?: Schema.Types.ObjectId
  phone?: string
  title?: string
  headline?: string
  about?: string
  createdAt: Date
  updatedAt: Date
  refreshToken?: string
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>
  generateAccessToken(): string
  generateRefreshToken(): string
}
