export interface IUser {
  username: string
  fullname: string
  email: string
  password: string
  imgUrl?: string
  phone?: string
  headline?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
  refreshToken?: string
}

export interface IUserMethods {
  comparePassword(password: string): Promise<boolean>
  generateAccessToken(): string
  generateRefreshToken(): string
}
