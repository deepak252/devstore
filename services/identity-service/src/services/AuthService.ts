import { publishEvent } from '../events/producer'

export default class AuthService {
  static sendEmailVerificationLink = async (email: string, token: string) => {
    await publishEvent(
      'user.verifyemail',
      JSON.stringify({
        email,
        token
      })
    )
    return { email }
  }
}
