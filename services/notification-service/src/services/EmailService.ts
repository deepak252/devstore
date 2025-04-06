import nodemailer from 'nodemailer'
import logger from '../utils/logger'
import {
  CLIENT_URL,
  SMTP_EMAIL_HOST,
  SMTP_EMAIL_PASSWORD,
  SMTP_EMAIL_USER
} from '../config/env'
import { emailVerificationTemplate } from '../utils/templates'

const transporter = nodemailer.createTransport({
  host: SMTP_EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: SMTP_EMAIL_USER,
    pass: SMTP_EMAIL_PASSWORD
  }
})

export default class EmailService {
  static sendVerificationEmail = async ({ email, token }: any = {}) => {
    try {
      if (!email || !token) {
        throw new Error('Invalid payload')
      }
      const verifyLink = `${CLIENT_URL}/auth/verify-email?token=${token}`
      const result = await transporter.sendMail({
        from: `"Devstore" <${SMTP_EMAIL_USER}>`,
        to: email,
        subject: 'Verify your email',
        html: emailVerificationTemplate(verifyLink)
      })
      logger.info(`Email sent: ${result.messageId}`)
    } catch (e) {
      logger.error('Error sending email: ', e)
    }
  }
}
