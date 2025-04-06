import jwt, { SignOptions } from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  EMAIL_VERIFICATION_TOKEN_SECRET,
  EMAIL_VERIFICATION_TOKEN_EXPIRY
} from '../config/env.js'

type JWTPayload = {
  userId: string
  username: string
  email: string
  fullName?: string
}

/**
 * @returns JWT Access token
 */
export const generateAccessToken = ({
  userId,
  username,
  email
}: JWTPayload) => {
  return jwt.sign({ userId, username, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY
  } as SignOptions)
}

/**
 * @returns JWT Refresh token
 */
export const generateRefreshToken = ({ userId }: { userId: string }) => {
  return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY
  } as SignOptions)
}

/**
 * @returns JWT Email Verification token
 */
export const generateEmailVerificationToken = ({
  email
}: {
  email: string
}) => {
  return jwt.sign(
    { email, type: 'email-verify' },
    EMAIL_VERIFICATION_TOKEN_SECRET,
    {
      expiresIn: EMAIL_VERIFICATION_TOKEN_EXPIRY
    } as SignOptions
  )
}

/**
 * @param token - JWT Access token
 */
export const verifyAccessToken = (token: string): JWTPayload | null => {
  return jwt.verify(token, ACCESS_TOKEN_SECRET) as JWTPayload
}

/**
 * @param token - JWT Email Verification token
 * @returns user
 */
export const verifyEmailVerificationToken = (token: string) => {
  return jwt.verify(token, EMAIL_VERIFICATION_TOKEN_SECRET) as {
    email: string
    type: string
  }
}

/**
 * @param token - JWT Access token
 * @returns user
 */
export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_TOKEN_SECRET)
}

export const generatePasswordHash = async (password: string) => {
  return await bcryptjs.hash(password, 10)
}

export const comparePassword = async (
  candidatePassword: string,
  password: string
) => {
  return await bcryptjs.compare(candidatePassword, password)
}
